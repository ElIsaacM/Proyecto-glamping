import TablaGeneral from "../../../components/tabla";

function ServicioTable() {
  const data = [
    {
      Nombre: 'Masaje', 
      Encargado: 'John Arias', 
      Duracion: '20 Minutos',
      'Precio total': '$ 80.000',
      Ganancia: '$ 80.000',
      Descripcion: 'Masaje capilar...',
    },
    {
      Nombre: 'Taxi', 
      Encargado: 'Ana Montes',
      Duracion: '20 Minutos',
      'Precio total': '$ 100.000',
      Ganancia: '$ 100.000',
      Descripcion: 'Taxi de ida y vuelta...',
    },
  ];

  return(
    <TablaGeneral data={ data }></TablaGeneral>
  );
}

export default ServicioTable;