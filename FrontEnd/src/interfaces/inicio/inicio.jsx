import styled from "styled-components";

import Plantilla from "../plantilla";
import BotonDescargar from "../../components/buttons/botonDescargar";
import InicioCards from "./info/inicioCard";
import LinearGraph from "../../components/graphs/linearGraph";
import NotificacionInicio from "./info/inicioNotificacion";

const FechaInforme = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const GraphNovedades = styled.div`
  margin: 30px 0 0 0;
  display: grid;
  grid-template-columns: 65% 33%;
  gap: 20px;

  @media (max-width: 1350px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Novedades = styled.div`
  h3{
    margin-bottom: 12px;
  }
`;

function Inicio() {
  return (
    <Plantilla modulo={'Inicio'}>
      <FechaInforme>
        <h3>10 Agosto - 17 Agosto</h3>
        <BotonDescargar />
      </FechaInforme>
      <InicioCards />
      <GraphNovedades>
        <LinearGraph />
        <Novedades>
          <h3>Novedades</h3>
          <NotificacionInicio />
        </Novedades>
      </GraphNovedades>
    </Plantilla>
  );
}

export default Inicio;