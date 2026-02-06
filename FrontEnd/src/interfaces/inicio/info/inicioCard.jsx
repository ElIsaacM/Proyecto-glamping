import RectangleCard from "../../../components/cards/rectangleCard";

function InicioCards() {
  const data = [
    {
      bgColor: 'verde',
      icono: 'bi bi-cash-coin',
      titulo: 'Ganancias',
      info: '1.500.000',
      texto: 'Esta semana se ha vendido un 10% mas que la semana pasada',
    },
    {
      bgColor: '',
      icono: 'bi bi-calendar-week-fill',
      titulo: 'Reservas completas',
      info: '65',
      texto: 'Que mal, las reservas completadas han bajado un 10% este mes :(',
    },
    {
      bgColor: '',
      icono: 'bi bi-box-fill',
      titulo: 'Paquete mas vendido',
      info: 'Ocacional',
      texto: 'El paquete ocasional ha sido reservado un total de 23 veces este mes',
    },
    {
      bgColor: '',
      icono: 'bi bi-stars',
      titulo: 'Dia mas reservado',
      info: 'Jueves',
      texto: 'El dia jueves es el favorito para reservar de los clientes',
    },
  ];

  return(
    <RectangleCard rectangleData={ data }></RectangleCard>
  );
}

export default InicioCards;