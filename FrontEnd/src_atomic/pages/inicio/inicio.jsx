import styled from "styled-components";
import { downloadPDF } from "../../utils/downloadUtils";

import BotonDescargar from "../../components/atoms/buttons/botonDescargar";
import InicioCard from "./componentsData/inicioCard";
import LinearGraph from "../../components/organisms/graphs/linearGraph";
import NotificacionInicio from "./componentsData/inicioNotificacion";
import { useFetch } from "../../hooks/fetchConnect";
import { useEffect, useState } from "react";

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
  const { data, fetchData } = useFetch();
  const [refreshStatsTrigger, setRefreshStatsTrigger] = useState(0);

  const handleDownloadPDF = () => {
    downloadPDF("dashboard-report", "Informe-mensual.pdf");
  }

  const handleFetchData = () => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/payments/stats`);
    setRefreshStatsTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    handleFetchData();
  }, [fetchData]);

  return (
    <div id="dashboard-report" style={{ padding: '10px' }}>
      <FechaInforme>
        <h3>10 Agosto - 17 Agosto</h3>
        <BotonDescargar onClick={handleDownloadPDF} />
      </FechaInforme>
      <InicioCard refreshTrigger={refreshStatsTrigger} />
      {console.log(data?.revenue_graph)}
      <GraphNovedades>
        <LinearGraph data={data?.revenue_graph} title="Ingresos acumulados por pagos" />
        <Novedades>
          <h3>Novedades</h3>
          <NotificacionInicio />
        </Novedades>
      </GraphNovedades>
    </div >
  );
}

export default Inicio;