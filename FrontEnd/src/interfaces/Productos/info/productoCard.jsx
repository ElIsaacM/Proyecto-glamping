import RectangleCard from "../../../components/cards/rectangleCard";

function ProductoCards() {
  const data = [
    {
      bgColor: 'verde',
      icono: 'bi bi-box-fill',
      titulo: 'Producto mas solicitado',
      info: 'Coca cola',
      texto: 'La coca cola ha sido solicitada 250 veces este mes.',
    },
    {
      bgColor: '',
      icono: 'bi bi-box-fill',
      titulo: 'Producto menos vendido',
      info: 'Ajiaco',
      texto: 'El ajiaco solo ha sido comprado 20 veces este mes.',
    },
  ];

  return(
    <RectangleCard rectangleData={ data }></RectangleCard>
  );
}

export default ProductoCards;