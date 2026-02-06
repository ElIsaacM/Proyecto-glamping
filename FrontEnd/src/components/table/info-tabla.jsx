import TablaGeneral from "./tabla";

function InfoTablaGeneral() {
  const data = [
    {
      Nombre: 'Palmas',
      Estado: 'Activa',
      Precio: 240000
    },
    {
      Nombre: 'Palmas',
      Estado: 'Activa',
      Precio: 240000
    },
    {
      Nombre: 'Palmas',
      Estado: 'Activa',
      Precio: 240000
    },
    {
      Nombre: 'Palmas',
      Estado: 'Activa',
      Precio: 240000
    }
  ];

  return(
    <TablaGeneral data={ data }></TablaGeneral>
  );
}

export default InfoTablaGeneral;