import RectangleCard from "../../../components/molecules/cards/rectangleCard";
import PieGraph from "../../../components/organisms/graphs/PieGraph";
import { useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

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
      info: mostFrecuent ? mostFrecuent.servicio_nombre : 'N/A',
      texto: mostFrecuent ? `El servicio ha sido solicitado ${mostFrecuent.veces_reservado} veces este mes y ha generado $${mostFrecuent.ingresos_generados} en ingresos` : 'Sin datos',
    },
    {
      bgColor: '',
      icono: 'bi bi-box-fill',
      titulo: 'Servicio menos solicitado',
      info: leastFrecuent ? leastFrecuent.servicio_nombre : 'N/A',
      texto: leastFrecuent ? `El servicio ha sido solicitado solo ${leastFrecuent.veces_reservado} veces este mes y ha generado $${leastFrecuent.ingresos_generados} en ingresos` : 'Sin datos',
    }
  ];

  const pieGraphData = [
    {
      titulo: 'Top 3 servicios',
      data: data?.top_services?.map(item => ({
        name: item.servicio_nombre,
        value: parseInt(item.veces_reservado, 10),
        income: parseFloat(item.ingresos_generados).toFixed(2)
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