import TablaGeneral from "../../../components/tabla";

function PaqueteTable() {
  const data = [
    {
      Nombre: 'Palmas',
      Dias: 'Activa',
      'Precio total': 240000,
      'Agregado por': 'Juan Perez',
      'Fecha de registro': '30 / 02 / 2020',
      Descripcion: 'El paquete ocasional...',
      'Detalles del paquete': 'Ver detalles',
    },
  ];

  return(
    <TablaGeneral data={ data }></TablaGeneral>
  );
}

export default PaqueteTable;