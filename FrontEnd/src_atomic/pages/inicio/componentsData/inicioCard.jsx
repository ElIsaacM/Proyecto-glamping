import { useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";
import RectangleCard from "../../../components/molecules/cards/rectangleCard";
import { formatCurrency } from "../../../utils/formattersUtil";

function InicioCard({ refreshTrigger }) {
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard`);
  }, [fetchData, refreshTrigger]);

  const stats = [
    {
      bgColor: 'verde',
      icono: 'bi bi-cash-coin',
      titulo: 'Ganancias',
      info: `${formatCurrency(data?.getRevenueByMonth?.[0]?.["Ingresos"])}` || "$0",
      texto: 'Esta semana se ha vendido un 10% mas que la semana pasada',
    },
    {
      bgColor: '',
      icono: 'bi bi-calendar-week-fill',
      titulo: 'Reservas completas',
      info: data?.totalReservations?.[0]?.total_reservations || '0',
      texto: 'Que mal, las reservas completadas han bajado un 10% este mes :(',
    },
    {
      bgColor: '',
      icono: 'bi bi-box-fill',
      titulo: 'Paquete mas vendido',
      info: data?.mostPopularPackage?.[0]?.['nombre'] || 'N/A',
      texto: `El paquete ${data?.mostPopularPackage?.[0]?.['nombre']} ha sido reservado un total de ${data?.mostPopularPackage?.[0]?.['total']} veces este mes`,
    },
    {
      bgColor: '',
      icono: 'bi bi-stars',
      titulo: 'Dia mas reservado',
      info: data?.mostPopularDay?.[0]?.['dia_semana'] || 'N/A',
      texto: `El dia ${data?.mostPopularDay?.[0]?.['dia_semana']} es el favorito para reservar de los clientes`,
    },
  ];

  return (
    <RectangleCard rectangleData={stats} />
  );
}

export default InicioCard;
