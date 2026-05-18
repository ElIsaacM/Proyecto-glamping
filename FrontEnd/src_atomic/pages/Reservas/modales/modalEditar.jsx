import { useState, useEffect, useRef } from "react";
import ModalPlantilla from "../../../components/organisms/Modales/modalPlantilla";
import { useForm } from "../../../hooks/useForm";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-weight: bold;
    color: #333;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: inherit;
  }

  button {
    padding: 10px;
    background-color: #4A90E2; 
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
    &:hover:not(:disabled) {
      background-color: #357ABD;
    }
    &:disabled {
      background-color: #a0c4ec;
      cursor: not-allowed;
    }
  }
`;

export default function ModalEditar({ setModalAbierto, fetchData, reservaAEditar }) {
  const [lockError, setLockError] = useState("");
  const [locking, setLocking] = useState(false);
  const lockIdRef = useRef(null);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split('T')[0];
  };

  const reservaId = reservaAEditar.id || reservaAEditar.reservacionid;
  const urlParams = `${import.meta.env.VITE_API_BASE_URL}/api/reservations/update/${reservaId}`;

  const { formData, handleChange, handleSubmit, submitting, setFormData } = useForm(
    {
      llegada: formatDateForInput(reservaAEditar.llegada),
      salida: formatDateForInput(reservaAEditar.salida),
      userName: localStorage.getItem('userName') || '',
      lockId: ""
    },
    urlParams,
    () => {
      lockIdRef.current = null; // Para no borrarlo en el onClose
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/reservations`);
      setModalAbierto(false); 
    },
    'PUT'
  );

  const releaseLock = async (idToUnlock) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/unlock/${idToUnlock}`, {
        method: 'DELETE',
        headers: {
          ...(localStorage.getItem("token") ? { "Authorization": `Bearer ${localStorage.getItem("token")}` } : {})
        }
      });
    } catch (e) {
      console.error("Error al liberar bloqueo", e);
    }
  };

  useEffect(() => {
    const llegada = formData.llegada;
    const salida = formData.salida;
    const origLlegada = formatDateForInput(reservaAEditar.llegada);
    const origSalida = formatDateForInput(reservaAEditar.salida);

    if (!llegada || !salida) return;

    if (llegada === origLlegada && salida === origSalida) {
      setLockError("");
      if (lockIdRef.current) {
        releaseLock(lockIdRef.current);
        lockIdRef.current = null;
        setFormData(prev => ({ ...prev, lockId: "" }));
      }
      return;
    }

    const timer = setTimeout(async () => {
      setLocking(true);
      setLockError("");

      if (lockIdRef.current) {
        await releaseLock(lockIdRef.current);
        lockIdRef.current = null;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/lock/${reservaId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.getItem("token") ? { "Authorization": `Bearer ${localStorage.getItem("token")}` } : {})
          },
          body: JSON.stringify({ llegada, salida })
        });

        const data = await res.json();

        if (!res.ok) {
          setLockError(data.message || "Fechas no disponibles");
          setFormData(prev => ({ ...prev, lockId: "" }));
        } else {
          lockIdRef.current = data.lockId;
          setFormData(prev => ({ ...prev, lockId: data.lockId }));
        }
      } catch (err) {
        setLockError("Error al verificar disponibilidad");
      } finally {
        setLocking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.llegada, formData.salida, reservaId, reservaAEditar, setFormData]);

  const handleClose = async () => {
    if (lockIdRef.current) {
      await releaseLock(lockIdRef.current);
      lockIdRef.current = null;
    }
    setModalAbierto(false);
  };

  return (
    <ModalPlantilla titulo="Editar Fechas de Reserva" onClose={handleClose}>
      <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
        <label>Nueva Fecha de Llegada</label>
        <input
          type="date"
          name="llegada"
          value={formData.llegada}
          onChange={handleChange}
          required
        />
        
        <label>Nueva Fecha de Salida</label>
        <input
          type="date"
          name="salida"
          value={formData.salida}
          onChange={handleChange}
          required
        />

        {locking && <p style={{ color: "#4A90E2" }}>Verificando disponibilidad...</p>}
        {lockError && <p style={{ color: "red", fontWeight: "bold" }}>{lockError}</p>}
        {!lockError && lockIdRef.current && !locking && (
          <p style={{ color: "green", fontWeight: "bold" }}>Fechas bloqueadas y disponibles temporalmente.</p>
        )}

        <button type="submit" disabled={submitting || !!lockError || locking}>
          {submitting ? 'Actualizando...' : 'Actualizar Reserva'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}
