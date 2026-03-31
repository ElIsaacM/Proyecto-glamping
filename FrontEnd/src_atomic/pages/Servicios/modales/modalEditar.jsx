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

export default function ModalEditar({ setModalAbierto, fetchData, servicioAEditar }) {
  // Utilizamos casi el mismo código que en agregar, pero pasando el objeto actual "servicioAEditar"
  // como estado inicial. 
  // IMPORTANTE: Le pasamos 'PUT' como 4to argumento
  const urlParams = `${import.meta.env.VITE_API_BASE_URL}/api/services/${servicioAEditar.servicioid}`;

  const { formData, handleChange, handleSubmit, submitting } = useForm(
    {
      nombre: servicioAEditar.nombre || servicioAEditar.Nombre || '',
      encargado: servicioAEditar.encargado || servicioAEditar.Encargado || '',
      duracionminutos: servicioAEditar.duracionminutos || servicioAEditar.DuracionMinutos || '',
      precio: servicioAEditar.precio || servicioAEditar.Precio || '',
      descripcion: servicioAEditar.descripcion || servicioAEditar.Descripción || ''
    },
    urlParams,
    () => {
      // Callback OnSuccess
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    },
    'PUT' // <--- Le decimos a nuestro custom hook que esto es una actualizacion
  );

  return (
    <ModalPlantilla modulo="editar servicio" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={(e) => handleSubmit(e, () => setModalAbierto(false))}>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre del servicio" 
          value={formData.nombre} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="encargado" 
          placeholder="Encargado" 
          value={formData.encargado} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="duracionminutos" 
          placeholder="Duración en minutos" 
          value={formData.duracionminutos} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          step="0.01" 
          name="precio" 
          placeholder="Precio por hora" 
          value={formData.precio} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="descripcion" 
          placeholder="Descripción del servicio" 
          value={formData.descripcion} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Actualizando...' : 'Actualizar Servicio'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}
