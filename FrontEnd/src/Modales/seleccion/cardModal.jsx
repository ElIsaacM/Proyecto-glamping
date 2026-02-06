import styled from 'styled-components';

const CardsModalCont = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px 0px; 

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  overflow-y: auto;
`;

const Card = styled.div`
  width: 80px;
  min-width: 80px;
  padding: 10px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  img{
    width: 100%;
    height: 60px;
  }

  h6{
    margin: 5px;
  }
`;

function CardModal({ cardData }) {
  return(
    <CardsModalCont>
      {cardData.map((item, i) => (
        <Card key={i}>
          <img src={item.img} alt="Imagen" />
          <h6>{item.nombre}</h6>
        </Card>
      ))}
      <Card style={{ visibility: 'hidden' }} />
    </CardsModalCont>
  );
}

export default CardModal;