import LinearCard from "../../../components/cards/linearCard";

function UsuariosCard() {
  const data = [
    {
      bgColor: '',
      colorTitulo: '#28a745',
      texto: 'Ultimos agregados',
      titulo: '13',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#ffc107',
      texto: 'Usuarios de mantenimiento',
      titulo: '25',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#dc3545',
      texto: 'Usuarios inactivos',
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

export default UsuariosCard;