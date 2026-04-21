import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

import LoginTemplate from "../../components/templates/loginTemplate";

function Register() {
  const navigate = useNavigate();

  const { formData, handleChange, handleSubmit, submitting } = useForm(
    { tipo_identificacion: 'CC', numero_identificacion: '', email: '', contrasena: '', confirmContrasena: '' },
    `${import.meta.env.VITE_API_BASE_URL}/api/login/create`,
    () => {
      alert("Usuario registrado/vinculado exitosamente.");
      navigate("/login");
    }
  );

  function handlePasswordValidate(e) {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmContrasena) {
      alert("Las contraseñas no coinciden. Por favor, verifícalas.");
      return;
    }
    handleSubmit(e);
  }

  return (
    <LoginTemplate>
      <h4>Nos alegra tenerte en nuestro equipo</h4>

      <form action="" onSubmit={handlePasswordValidate}>
        <label htmlFor="">Identificacion</label>
        <Identificacion>
          <select 
            name="tipo_identificacion" 
            value={formData.tipo_identificacion}
            onChange={handleChange}
          >
            <option value="CC">CC</option>
            <option value="CE">CE</option>
            <option value="TI">TI</option>
          </select>
          <input
            type="text"
            name="numero_identificacion"
            value={formData.numero_identificacion}
            onChange={handleChange}
            required
          />
        </Identificacion>

        <label htmlFor="">Correo Electronico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="">Contraseña</label>
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />

        <label htmlFor="">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmContrasena"
          value={formData.confirmContrasena}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Registrarse'}
        </button>
      </form>

      <Link to="/login">¿Ya tienes una cuenta?</Link>
    </LoginTemplate>
  )
}

export default Register;

const Identificacion = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #333;
    font-size: 14px;
  }

  select:focus {
    outline: none;
  }

  input {
    width: 100%;
  }
`;