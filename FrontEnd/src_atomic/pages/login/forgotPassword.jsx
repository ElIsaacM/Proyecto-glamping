import styled from "styled-components";
import { Link } from "react-router-dom";

import LoginTemplate from "../../components/templates/loginTemplate";

function ForgotPassword() {
  return (
    <LoginTemplate>
      <h1>Hola, Bienvenido de Nuevo!</h1>
      <h4>Nos alegra tenerte de vuelta por aqui</h4>

      <form action="">
        <label htmlFor="">Correo Electronico</label>
        <input type="email" />

        <label htmlFor="">Contraseña</label>
        <input type="password" />

        <label htmlFor="">Confirmar Contraseña</label>
        <input type="password" />

        <button type="submit">Restablecer Contraseña</button>
      </form>

      <div>
        <Line />
        <p>O</p>
        <Line />
      </div>

      <Link to="/login">¿Ya tienes una cuenta?</Link>
      <Link to="/register">¿No tienes una cuenta?</Link>
    </LoginTemplate>
  )
}

export default ForgotPassword;

const Line = styled.div`
  width: 100px;
  height: 2px;
  background-color: #424242ff;
  border: 1px solid #424242ff;
`;