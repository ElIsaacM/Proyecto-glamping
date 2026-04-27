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
  const { formData, handleChange, handleSubmit, submitting } = useForm(
    { 
      tipo_id: '', 
      registrado_por_id: '', 
      nombre: '', 
      dias_estadia: '', 
      descripcion: '',

      userName: localStorage.getItem('userName') || '',
    },
    `${import.meta.env.VITE_API_BASE_URL}/api/packages`,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    }
  );

  return (
    <ModalPlantilla modulo="paquetes" onClose={() => setModalAbierto(false)}>
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
          type="number" 
          name="registrado_por_id" 
          placeholder="Registrado por" 
          value={formData.registrado_por_id} 
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
          {submitting ? 'Guardando...' : 'Guardar Paquete'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}