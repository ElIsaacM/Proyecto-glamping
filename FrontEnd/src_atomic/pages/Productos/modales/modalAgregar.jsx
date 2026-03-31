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
  const { formData, handleChange, handleSubmit, submitting } = useForm(
    { nombre: '', tipo: '', stock: '', precioventa: '', descripcion: '' },
    `${import.meta.env.VITE_API_BASE_URL}/api/products`,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    }
  );

  return (
    <ModalPlantilla modulo="productos" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={(e) => handleSubmit(e, () => setModalAbierto(false))}>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre del producto" 
          value={formData.nombre} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="tipo" 
          placeholder="Tipo (ej: Limpieza, Bebidas...)" 
          value={formData.tipo} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="stock" 
          placeholder="Cantidad en stock" 
          value={formData.stock} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          step="0.01" 
          name="precioventa" 
          placeholder="Precio de venta" 
          value={formData.precioventa} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="descripcion" 
          placeholder="Descripción del producto" 
          value={formData.descripcion} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </Form>
    </ModalPlantilla>
  );
}