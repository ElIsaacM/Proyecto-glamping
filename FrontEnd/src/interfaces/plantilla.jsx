import { useState } from "react";
import styled from "styled-components";

import HeaderGeneral from "../components/headerGeneral";
import InfoNavBar from "../components/nav/info-navGeneral";
import MainGeneral from "../components/mainGeneral";

const Container = styled.div`
  display: flex;
`;

const Right = styled.div`
  width: calc(100% - 80px);
  overflow-x: hidden;

  .mainGeneral {
    overflow: auto;
  }

`;

function Plantilla({ modulo, children }) {
  const [modalContenido, setModalContenido] = useState(null); // null | 'seleccion' | 'producto' | etc.

  const abrirModal = (componente) => setModalContenido(componente);
  const cerrarModal = () => setModalContenido(null);

  return (
    <Container>
      <InfoNavBar />
      <Right>
        <HeaderGeneral user="Joe Lopez" />
        <MainGeneral modulo={modulo} className="mainGeneral">
          {typeof children === "function"
            ? children({ abrirModal, cerrarModal, modulo })
            : children}
        </MainGeneral>
      </Right>

      {modalContenido && modalContenido}
    </Container>
  );
}

export default Plantilla;
