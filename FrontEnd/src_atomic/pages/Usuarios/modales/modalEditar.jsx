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
      rol_id: usuarioAEditar.rol_id ?? '',
      identificacion_id: usuarioAEditar.identificacion_id ?? '',
      nombre: usuarioAEditar.usuario || '',
      contacto: usuarioAEditar.contacto || '',
      sueldo: usuarioAEditar.sueldo || '',
      numero_identificacion: usuarioAEditar["# Identificacion"] || '',
    },
    urlParams,
    () => {
      // Callback OnSuccess
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    },
    'PUT' // <--- Le decimos a nuestro custom hook que esto es una actualizacion
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
        />
        <input
          type="text"
          name="contacto"
          placeholder="Contacto"
          value={formData.contacto}
          onChange={handleChange}
        />
        <input
          type="number"
          name="sueldo"
          placeholder="Sueldo"
          value={formData.sueldo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numero_identificacion"
          placeholder="Número de identificación"
          value={formData.numero_identificacion}
          onChange={handleChange}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Actualizando...' : 'Actualizar Usuario'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}
