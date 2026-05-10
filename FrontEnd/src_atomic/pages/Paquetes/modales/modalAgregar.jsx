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
  const { formData, handleChange, handleSubmit, submitting } = useForm(
    { 
      nombre: '',
      userName: localStorage.getItem('userName') || '',
    },
    `${import.meta.env.VITE_API_BASE_URL}/api/packages/createType`,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages/types`);
      setModalAbierto(false);
    }
  );

  return (
    <ModalPlantilla modulo="tipo de paquete" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={(e) => handleSubmit(e, () => setModalAbierto(false))}>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre del tipo" 
          value={formData.nombre} 
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