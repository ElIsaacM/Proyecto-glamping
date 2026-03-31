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
  //nota: quiero qu el modal de agregar, pida los datos (facturaid, correo del cliente, totalpagado) de diferentes tablas, eso se debe manejar desde el model? 
  const { formData, handleChange, handleSubmit, submitting } = useForm(
    {
      facturaid: '',
      email: '',
      metodoid: 7,
      totalpagado: ''
    },
    `${import.meta.env.VITE_API_BASE_URL}/api/payments`,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/payments`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    }
  );

  return (
    <ModalPlantilla modulo="pagos" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={(e) => handleSubmit(e, () => setModalAbierto(false))}>
        <input type="text" name="facturaid" placeholder="ID de la factura" value={formData.facturaid} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo del cliente" value={formData.email} onChange={handleChange} required />
        <input type="number" step="0.01" name="totalpagado" placeholder="Total pagado" value={formData.totalpagado} onChange={handleChange} required />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar Pago'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}