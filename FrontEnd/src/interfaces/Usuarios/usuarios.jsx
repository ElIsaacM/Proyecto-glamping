import React from "react";
import Plantilla from "../plantilla";
import Buscador from "../../components/buscador";
import UsuariosCard from "./info/usuariosCard";
import TablaUsuarios from "./info/usuariosTable";

function Usuarios() {
  return (
    <Plantilla modulo={'Usuarios'}>
      {({ abrirModal, cerrarModal }) => (
        <>
          <UsuariosCard abrirModal={abrirModal} cerrarModal={cerrarModal} />
          <div style={{ marginTop: '20px' }}>
            <Buscador placeholder={'Buscar usuario...'} />
          </div>
          <TablaUsuarios />
        </>
      )}
    </Plantilla>
  );
}

export default Usuarios;