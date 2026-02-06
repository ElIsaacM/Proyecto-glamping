import TablaGeneral from "../../../components/tabla";

function ProductoTable() {
  const data = [
    {
      Nombre: 'Coca cola', 
      Tipo: 'Gaseosa', 
      Stock: '20', 
      'Precio venta': '$ 2.500', 
      Descripcion: 'El producto...', 
    },
    {
      Nombre: 'Kellos sorpresa', 
      Tipo: 'Cereales', 
      Stock: '15', 
      'Precio venta': '$ 8.000', 
      Descripcion: 'El producto...', 
    },
    {
      Nombre: 'Bandeja paisa',
      Tipo: 'Almuerzo',
      Stock: 'N/A',
      'Precio venta': '$ 15.000',
      Descripcion: 'El producto...', 
    },
  ];

  return(
    <TablaGeneral data={ data }></TablaGeneral>
  );
}

export default ProductoTable;