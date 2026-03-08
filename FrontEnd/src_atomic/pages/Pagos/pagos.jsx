import styled from "styled-components";
import { useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import Plantilla from "../plantilla";
import Buscador from "../../components/molecules/buscador";
import LinearCard from "../../components/molecules/cards/linearCard";
import TablaGeneral from "../../components/organisms/tables/tabla";
import Factura from "../../components/organisms/factura";
import { pagosCardData, pagosTableData } from "./componentsData/pagosData";

const Botones = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const TablaFactura = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  height: 100vh;
`;

function Pagos() {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData('http://localhost:3000/api/payments');
  }, [fetchData]);


  return (
    <Plantilla modulo={'Pagos'}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <LinearCard data={pagosCardData} />
          <Botones>
            <Buscador placeholder={'Buscar fecha'} />
          </Botones>
          <TablaFactura>
            <TablaGeneral data={data || pagosTableData} className="tabla" />
            <Factura className="factura" />
          </TablaFactura>
        </>
      )}
    </Plantilla>
  );
}

export default Pagos;
