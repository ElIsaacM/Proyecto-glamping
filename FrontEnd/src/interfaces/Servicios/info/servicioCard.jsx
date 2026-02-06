import RectangleCard from "../../../components/cards/rectangleCard";

function ServicioCards() {
  const data = [
    {
      bgColor: 'verde',
      icono: 'bi bi-box-fill',
      titulo: 'Servicio mas solicitado',
      info: 'Masaje',
      texto: 'El masaje ha sido solicitado 30 veces este mes',
    },
    {
      bgColor: '',
      icono: 'bi bi-box-fill',
      titulo: 'Servicio menos solicitado',
      info: 'Taxi',
      texto: 'El servicio de taxi ha sido solicitado solo 10 veces este mes',
    },
  ];

  return(
    <RectangleCard rectangleData={ data }></RectangleCard>
  );
}

export default ServicioCards;