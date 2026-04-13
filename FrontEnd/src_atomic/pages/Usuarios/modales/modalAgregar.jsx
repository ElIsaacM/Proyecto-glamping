import ModalPlantilla from "../../../components/organisms/Modales/modalPlantilla";
import { useForm } from "../../../hooks/useForm";
import styled from "styled-components";
import SelectBase from "../../../components/atoms/select/selectBase";
import { useState, useEffect } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: inherit;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  button {
    padding: 10px;
    background-color: #43523A;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      background-color: #2c3825;
    }
  }
`;

export default function ModalAgregar({ setModalAbierto, fetchData }) {
  // 2. Tu useForm funciona perfecto aquí
  // Agregar capacidad personas

  const [roles, setRoles] = useState([]);
  const [identificaciones, setIdentificaciones] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/types/roles`)
      .then(res => res.json())
      .then(data => {
        // Añadir opción por defecto al inicio
        setRoles([{ rol_id: "", nombre: "Seleccione un rol" }, ...data]);
      })
      .catch(err => console.error("Error fetching roles", err));

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/types/identificaciones`)
      .then(res => res.json())
      .then(data => {
        setIdentificaciones([{ identificacion_id: "", tipo: "Tipo de identificación" }, ...data]);
      })
      .catch(err => console.error("Error fetching identificaciones", err));
  }, []);

  const { formData, handleChange, handleSubmit, submitting } = useForm(
    { 
      rol_id: '', 
      identificacion_id: '', 
      nombre: '', 
      contacto: '', 
      sueldo: '', 
      numero_identificacion: '' 
    },
    `${import.meta.env.VITE_API_BASE_URL}/api/users`,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    }
  );

  return (
    <ModalPlantilla modulo="usuarios" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={handleSubmit}>
        <SelectBase
          name="rol_id"
          value={formData.rol_id}
          onChange={handleChange}
          required={false}
          options={roles}
          valueKey="rol_id"
          nameKey="nombre"
        />
        <SelectBase
          name="identificacion_id"
          value={formData.identificacion_id}
          onChange={handleChange}
          required={false}
          options={identificaciones}
          valueKey="identificacion_id"
          nameKey="tipo"
        />
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre del usuario" 
          value={formData.nombre} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="contacto" 
          placeholder="Contacto" 
          value={formData.contacto} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="sueldo" 
          placeholder="Sueldo" 
          value={formData.sueldo} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="numero_identificacion" 
          placeholder="Número de identificación" 
          value={formData.numero_identificacion} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar Usuario'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}