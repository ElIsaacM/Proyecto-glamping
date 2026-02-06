import styled from "styled-components";

import Plantilla from "../plantilla";
import UsuariosCard from "./info/usuariosCard";
import BotonRecargar from "../../components/buttons/botonRecargar";
import TablaUsuarios from "./info/usuariosTable";
import Buscador from "../../components/buscador";

const Botones = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 10px;
  }
`;

function Usuarios() {
  return (
    <Plantilla modulo={'Usuarios'}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <UsuariosCard></UsuariosCard>
          <Botones>
            <Buscador placeholder={'Buscar usuario'}></Buscador>
            <BotonRecargar />
          </Botones>
          <TablaUsuarios />
        </>
      )}
    </Plantilla>
  );
}

export default Usuarios;