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
    { rolid: '', identificacionid: '', nombre: '', contacto: '', sueldo: '', numeroidentificacion: '', email: '', contrasena: '', confirmPassword: '' },
    `${import.meta.env.VITE_API_BASE_URL}/api/users`,
    () => {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setModalAbierto(false); // Cerramos el modal al tener éxito
    }
  );

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    handleSubmit(e, () => setModalAbierto(false));
  }

  return (
    <ModalPlantilla modulo="usuarios" onClose={() => setModalAbierto(false)}>
      <Form onSubmit={handlePasswordSubmit}>
        <input 
          type="number" 
          name="rolid" 
          placeholder="Rol" 
          value={formData.rolid} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="identificacionid" 
          placeholder="Identificación" 
          value={formData.identificacionid} 
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
          name="numeroidentificacion" 
          placeholder="Número de identificación" 
          value={formData.numeroidentificacion} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="contrasena" 
          placeholder="Contraseña" 
          value={formData.contrasena} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirmar contraseña" 
          value={formData.confirmPassword} 
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