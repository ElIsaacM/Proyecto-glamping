import TablaGeneral from "../../../components/tabla";

function TablaPagos() {
  const data = [
    {
      Factura: 'FA2553325',
      'Fecha': 'Activa',
      Metodo: 'Tarjeta Visa',
      Subtotal: 220000,
      Total: 250000,
    },
  ];

  return(
    <TablaGeneral data={ data }></TablaGeneral>
  );
}

export default TablaPagos;