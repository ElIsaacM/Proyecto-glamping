import styled from "styled-components";
import HeaderGeneral from "../components/organisms/headerGeneral";
import InfoNavBar from "../components/organisms/nav/info-navGeneral";
import MainGeneral from "../templates/mainGeneral";

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
  // Eliminamos los estados y funciones del modal. 
  // La plantilla ahora solo envuelve el contenido.
  return (
    <Container>
      <InfoNavBar />
      <Right>
        <HeaderGeneral user="Joe Lopez" />
        <MainGeneral modulo={modulo} className="mainGeneral">
          {children}
        </MainGeneral>
      </Right>
    </Container>
  );
}

export default Plantilla;