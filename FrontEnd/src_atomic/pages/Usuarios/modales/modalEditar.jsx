import ModalPlantilla from "../../../components/organisms/Modales/modalPlantilla";
import { useForm } from "../../../hooks/useForm";
import styled from "styled-components";
import SelectBase from "../../../components/atoms/select/selectBase";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

import { Tooltip } from '../../../components/atoms/tooltip';
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
    background-color: #4A90E2; /* Color distintivo para editar, ej: azul */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      background-color: #357ABD;
    }
  }
`;

export default function ModalEditar({ setModalAbierto, fetchData, usuarioAEditar }) {
  // Utilizamos casi el mismo código que en agregar, pero pasando el objeto actual "productoAEditar"
  // como estado inicial. 
  // IMPORTANTE: Le pasamos 'PUT' como 4to argumento
  const urlParams = `${import.meta.env.VITE_API_BASE_URL}/api/users/${usuarioAEditar.usuario_id || usuarioAEditar.id}`;

  const { data, loading, error, fetchData: fetchRoles } = useFetch();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles(`${import.meta.env.VITE_API_BASE_URL}/api/types/roles`);
  }, []);

  useEffect(() => {
    if (data) {
      setRoles([{ rol_id: "", nombre: "Seleccione un rol" }, ...data]);
    }
  }, [data]);

  const { formData, handleChange, handleSubmit, submitting } = useForm(
    {
      rol_id: usuarioAEditar.rol_id ?? '',
      tipo_identificacion: usuarioAEditar["Tipo Ident.."] || '',
      numero_identificacion: usuarioAEditar["# Identificacion"] || '',
      nombre: usuarioAEditar.usuario || '',
      contacto: usuarioAEditar.contacto || '',
      sueldo: usuarioAEditar.sueldo || '',
    },
    urlParams,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setModalAbierto(false);
    },
    'PUT'
  );

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, () => setModalAbierto(false));
    console.log(usuarioAEditar);
  }

  return (
    <ModalPlantilla modulo="editar usuario" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={handlePasswordSubmit}>
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
        <Tooltip content="Número de identificación">
          <input
            type="text"
            name="numero_identificacion"
            placeholder="Número de identificación"
            value={formData.numero_identificacion}
            onChange={handleChange}
          />
        </Tooltip>
        <Tooltip content="Nombre del usuario">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del usuario"
            value={formData.nombre}
            onChange={handleChange}
          />
        </Tooltip>
        <Tooltip content="Número de contacto">
          <input
            type="text"
            name="contacto"
            placeholder="Contacto"
            value={formData.contacto}
            onChange={handleChange}
          />
        </Tooltip>
        <Tooltip content="Sueldo mensual, ej. 2000000">
          <input
            type="number"
            name="sueldo"
            placeholder="Sueldo"
            value={formData.sueldo}
            onChange={handleChange}
          />
        </Tooltip>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Actualizando...' : 'Actualizar Usuario'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}
