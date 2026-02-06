import CardModal from "../cardModal";

function ProductosCardModal() {
  const data = [
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Producto',
    }
  ];

  return (
    <CardModal cardData={data}></CardModal>
  );
}

export default ProductosCardModal;