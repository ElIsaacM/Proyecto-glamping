import styled from 'styled-components';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  max-width: 100%;
  gap: 20px;

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.button`
  height: 190px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  padding: 20px;
  box-sizing: border-box;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.bgColor == 'verde' ? '#43523A' : '#ffffff'};
  color: ${(props) => props.bgColor === 'verde' ? '#ffffff' : '#1a1a1a'};
`;

function SquareCard({ squareData }) {
  return(
    <CardsContainer>
      {squareData.map((item, i) => (
        <Card key={i} bgColor={item.bgColor}>
          <p>{item.texto}</p>
          <h4>{item.titulo}</h4>
        </Card>
      ))}
    </CardsContainer>
  );
}

export default SquareCard;
