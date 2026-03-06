import styled from "styled-components";

const ContGraph = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 5px;

  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  padding: 20px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    img{
      width: 80%;
    }
  }

  @media (max-width: 500px) {
    img{
      width: 90%;
    }
    height: 300px;
  }
`;

function LinearGraph() {
  return (
    <ContGraph>
      <img src="../../src\assets\GraficoLinea.svg" alt="" />
    </ContGraph>
  );
}

export default LinearGraph;