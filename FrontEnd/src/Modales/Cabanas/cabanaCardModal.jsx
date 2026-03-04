import CardModal from "../cardModal";

function CabanasCardModal() {
  const data = [
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'cabana',
    },
    {
      img: '../../src/assets/OnePiece.jpg',
      nombre: 'cabana',
    }
  ];

  return(
    <CardModal cardData={data}></CardModal>
  );
}

export default CabanasCardModal;