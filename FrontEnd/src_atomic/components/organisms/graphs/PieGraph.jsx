import styled from "styled-components";

const GraphsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ContGraph = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;

  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Graph = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 400px) {
    img{
      width: 100px;
    }
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LabelCircle = styled.div`
  width: 15px;
  height: 15px;
  margin: 0;
  border-radius: 50%;
  background: red;
`;

function PieGraph({ pieGraphData }) {
  const item = pieGraphData[0];

  return (
    <GraphsContainer>
      {pieGraphData.map((item, i) => (
        <ContGraph key={i}>
          <h3>{item.titulo}</h3>
          <Graph>
            <img src={item.img} alt="Grafico" />
            <div>
              <Label>
                <LabelCircle></LabelCircle>
                <h5>{item.top1}</h5>
              </Label>
              <Label>
                <LabelCircle></LabelCircle>
                <h5>{item.top2}</h5>
              </Label>
              <Label>
                <LabelCircle></LabelCircle>
                <h5>{item.top3}</h5>
              </Label>
            </div>
          </Graph>
        </ContGraph>
      ))}
    </GraphsContainer>
  );
}

export default PieGraph;