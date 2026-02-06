import CardModal from "../cardModal";

function ServiciosCardModal() {
  const data = [
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Servicio',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Servicio',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Servicio',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Servicio',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Servicio',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'Servicio',
    },
  ];

  return(
    <CardModal cardData={data}></CardModal>
  );
}

export default ServiciosCardModal;