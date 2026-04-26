import styled from "styled-components";
import BotonEntendido from "../atoms/buttons/botonEntendido";

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

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  h3 {
    font-size: 16px;
  }
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

function NotificacionV1({ data, handleDelete }) {
  const handleEliminar = (notificacion_id) => {
    handleDelete(notificacion_id);
  }

  return (
    <NotificacionesCont>
      {data?.map((item, i) => (
        <Notificacion key={i}>
          <Titulo>
            <img src="images/Logo.svg" alt="" />
            <h3>{item.creada_por}</h3>
          </Titulo>
          <div>
            <h4>{item.asunto}</h4>
            <h5>{item.mensaje}</h5>
          </div>
          <Opciones>
            <Boton color={1} onClick={() => handleEliminar(item.id)}>Eliminar</Boton>
          </Opciones>
        </Notificacion>
      ))}
    </NotificacionesCont>
  );
}

export default NotificacionV1;