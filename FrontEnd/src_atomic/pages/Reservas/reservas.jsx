import SquareCard from "../../components/molecules/cards/squareCard";
import { reservasCardData } from "./componentsData/reservasData";
import styled from "styled-components";

import Plantilla from "../plantilla";
import LinearGraph from "../../components/organisms/graphs/linearGraph";
import Buscador from "../../components/molecules/buscador";
import TablaGeneral from "../../components/organisms/tabla";
import { useFetch } from "../../hooks/fetchConnect";
import { useEffect } from "react";

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
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData('http://localhost:3000/api/reservations');
  }, [fetchData]);

  return (
    <Plantilla modulo={"Reservas"}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <LinearGraph />
            <SquareCard squareData={reservasCardData} />
          </CardsCont>
          <Botones>
            <Buscador placeholder={'Buscar fecha'} />
          </Botones>
          
          {loading && <p style={{marginTop: '20px'}}>Cargando reservas...</p>}
          {error && <p style={{marginTop: '20px', color: 'red'}}>Error: {error}</p>}
          {data && <TablaGeneral data={data} />}
        </>
      )}
    </Plantilla>
  );
}

export default Reservas;
