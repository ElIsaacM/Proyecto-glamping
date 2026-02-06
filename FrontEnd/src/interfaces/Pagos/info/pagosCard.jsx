import LinearCard from "../../../components/cards/linearCard";

function PagosCard() {
  const data = [
    {
      bgColor: '',
      colorTitulo: '#28a745',
      texto: 'Ultimos pagos',
      titulo: '13',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#ffc107',
      texto: 'Pagos cancelados',
      titulo: '25',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#dc3545',
      texto: 'Pagos incompletos',
      titulo: '149',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: 'verde',
      colorTitulo: '',
      texto: '',
      titulo: 'Agregar usuario',
      icon: 'bi bi-person-plus-fill',
    },
  ];

  return(
    <LinearCard data={ data }></LinearCard>
  );
}

export default PagosCard;