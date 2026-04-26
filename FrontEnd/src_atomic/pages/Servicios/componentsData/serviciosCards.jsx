import RectangleCard from "../../../components/molecules/cards/rectangleCard";
import PieGraph from "../../../components/organisms/graphs/PieGraph";
import { useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

import { formatCurrency } from "../../../utils/formattersUtil";

function ServiciosCards({ refreshTrigger }) {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/services/stats`);
  }, [refreshTrigger]);

  const mostFrecuent = data?.most_frecuent_service?.[0];
  const leastFrecuent = data?.least_frecuent_service?.[0];

  const serviciosCardData = [
    {
      bgColor: 'verde',
      icono: 'bi bi-box-fill',
      titulo: 'Servicio mas solicitado',
      info: mostFrecuent ? mostFrecuent.servicio : 'N/A',
      texto: mostFrecuent ? `El servicio ha sido solicitado ${mostFrecuent.veces_reservado} veces este mes y ha generado ${formatCurrency(mostFrecuent.ingresos_generados)} en ingresos` : 'Sin datos',
    },
    {
      bgColor: '',
      icono: 'bi bi-box-fill',
      titulo: 'Servicio menos solicitado',
      info: leastFrecuent ? leastFrecuent.servicio : 'N/A',
      texto: leastFrecuent ? `El servicio ha sido solicitado solo ${leastFrecuent.veces_reservado} veces este mes y ha generado ${formatCurrency(leastFrecuent.ingresos_generados)} en ingresos` : 'Sin datos',
    }
  ];

  const pieGraphData = [
    {
      titulo: 'Top 3 servicios',
      data: data?.top_services?.map(item => ({
        name: item.servicio,
        value: parseInt(item.veces_reservado, 10),
        income: formatCurrency(item.ingresos_generados)
      })) || []
    }
  ];

  return (
    <>
    {loading && <p>Cargando estadísticas...</p>}
    {error && <p>Error al cargar datos</p>}
    {data && (
      <>
        <RectangleCard rectangleData={serviciosCardData} />
        <PieGraph pieGraphData={pieGraphData} />
      </>
    )}
    </>
  );
}

export default ServiciosCards;