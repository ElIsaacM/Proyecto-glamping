import ModalPlantilla from "../../../components/organisms/Modales/modalPlantilla";
import { useForm } from "../../../hooks/useForm";
import styled from "styled-components";
import SelectBase from "../../../components/atoms/select/selectBase";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

import 'react-phone-number-input/style.css'; // Importante para ver las banderas
import PhoneInput from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es'; // Para nombres de países en español

import { identificaciones } from "../../../config/tipos";

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
  const { data, loading, error, fetchData: fetchRoles } = useFetch();

  useEffect(() => {
    fetchRoles(`${import.meta.env.VITE_API_BASE_URL}/api/types/roles`);
  }, []);

  useEffect(() => {
    if (data) {
      setRoles([{ rol_id: "", nombre: "Seleccione un rol" }, ...data]);
    }
  }, [data]);

  const { formData, handleChange, handleSubmit, submitting, setFormData } = useForm(
    {
      rol_id: '',
      tipo_identificacion: '',
      numero_identificacion: '',
      nombre: '',
      contacto: '',
      sueldo: '',
    },
    `${import.meta.env.VITE_API_BASE_URL}/api/users`,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    }
  );

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      contacto: value // Actualiza solo el campo contacto
    }));
  };

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
          name="tipo_identificacion"
          value={formData.tipo_identificacion}
          onChange={handleChange}
          required={false}
          options={identificaciones}
          valueKey="identificacion_id"
          nameKey="tipo"
        />
        <input
          type="text"
          name="numero_identificacion"
          placeholder="Número de identificación"
          value={formData.numero_identificacion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del usuario"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <div className="phone-input-container">
          <PhoneInput
            international
            defaultCountry="CO"
            labels={es}
            placeholder="Número de contacto"
            value={formData.contacto}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <input
          type="number"
          name="sueldo"
          placeholder="Sueldo"
          value={formData.sueldo}
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