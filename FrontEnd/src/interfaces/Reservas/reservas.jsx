import styled from "styled-components";

import Plantilla from "../plantilla";
import LinearGraph from "../../components/graphs/linearGraph";
import ReservaCards from "./info/reservaCard";
import Buscador from "../../components/buscador";
import TablaReservas from "./info/reservaTable";

const CardsCont = styled.div`
  margin: 50px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Botones = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 10px;
  }
`;



function Reservas() {
  return (
    <Plantilla modulo={"Reservas"}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <LinearGraph />
            <ReservaCards />
          </CardsCont>
          <Botones>
            <Buscador placeholder={'Buscar fecha'} />
          </Botones>
          <TablaReservas />
        </>
      )}
    </Plantilla>
  );
}

export default Reservas;
