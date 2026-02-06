import RectangleCard from "../../../components/cards/rectangleCard";

function PaqueteCards() {
  const data = [
    {
      bgColor: 'verde',
      icono: 'bi bi-box-fill',
      titulo: 'Paquete mas cancelado',
      info: 'Vacacional',
      texto: 'El paquete vacacional ha sido cancelado 20 veces este mes',
    },
    {
      bgColor: '',
      icono: 'bi bi-box-fill',
      titulo: 'Paquete mas cancelado',
      info: 'Vacacional',
      texto: 'El paquete vacacional ha sido cancelado 20 veces este mes',
    },
  ];

  return(
    <RectangleCard rectangleData={ data }></RectangleCard>
  );
}

export default PaqueteCards;