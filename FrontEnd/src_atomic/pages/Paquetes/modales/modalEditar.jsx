import ModalPlantilla from "../../../components/organisms/Modales/modalPlantilla";
import { useForm } from "../../../hooks/useForm";
import styled from "styled-components";

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

export default function ModalEditar({ setModalAbierto, fetchData, paqueteAEditar }) {
  // Utilizamos casi el mismo código que en agregar, pero pasando el objeto actual "productoAEditar"
  // como estado inicial. 
  // IMPORTANTE: Le pasamos 'PUT' como 4to argumento
  const urlParams = `${import.meta.env.VITE_API_BASE_URL}/api/packages/${paqueteAEditar.paquete_id}`;

  const { formData, handleChange, handleSubmit, submitting } = useForm(
    {
      tipo_id: paqueteAEditar.tipo_id || paqueteAEditar.tipo_id || '',
      nombre: paqueteAEditar.nombre || paqueteAEditar.Nombre || '',
      dias_estadia: paqueteAEditar.dias_estadia || paqueteAEditar.dias_estadia || '',
      descripcion: paqueteAEditar.descripcion || paqueteAEditar.descripcion || ''
    },
    urlParams,
    () => {
      // Callback OnSuccess
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    },
    'PUT' // <--- Le decimos a nuestro custom hook que esto es una actualizacion
  );

  return (
    <ModalPlantilla modulo="editar paquete" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={(e) => handleSubmit(e, () => setModalAbierto(false))}>
        <input 
          type="number" 
          name="tipo_id" 
          placeholder="Tipo de paquete" 
          value={formData.tipo_id} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre del paquete" 
          value={formData.nombre} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="dias_estadia" 
          placeholder="Días de estadía" 
          value={formData.dias_estadia} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="descripcion" 
          placeholder="Descripción del paquete" 
          value={formData.descripcion} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Actualizando...' : 'Actualizar Paquete'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}
