import styled from "styled-components";
import BotonEntendido from "./buttons/botonEntendido";

const NotificacionesCont = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
`;

const Notificacion = styled.div`
  background: white;
  color: #43523A;

  border-radius: 5px;
  width: 100%;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Titulo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Opciones = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
`;

const Boton = styled.button`
  border: 0;
  border-radius: 5px;
  padding: 10px 20px;

  background: ${(props) => props.color === 1 ? '#43523A' : '#ffffff'};
  color: ${(props) => props.color === 1 ? '#ffffff' : '#43523A'};
`;

function NotificacionV1({ data }) {
  return(
    <NotificacionesCont>
      {data.map((item, i) => (
        <Notificacion key={i}>
          <Titulo>
            <img src="../../src/assets/Logo glamping.svg" alt="" />
            <h3>{item.titulo}</h3>
          </Titulo>
          <div>
            <h4>{item.asunto}</h4>
            <h5>{item.texto}</h5>
          </div>
          <Opciones>
            <Boton>Recuerdame luego</Boton>
            <Boton color={1}>Entendido</Boton>
          </Opciones>
        </Notificacion>
      ))}
    </NotificacionesCont>
  );
}

export default NotificacionV1;