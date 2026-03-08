import styled from "styled-components";

const FacturaContenedor = styled.div`
  min-width: 330px;
  height: 500px;
  padding: 10px;

  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  box-sizing: border-box;
  border-radius: 5px;

  position: sticky;
  top: 0px;
`;

const FacturaTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`; 

const FacturaContenido = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;

  div{
    width: 30px;
    height: 15px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    padding: 0 3px;
    box-sizing: border-box;
    border-radius: 30px;
  }

  .circle{
    width: 8px;
    height: 8px;
    background: #ff0000;
    border-radius: 50%;
  }
`;

function Factura() {
  return(
    <FacturaContenedor>
      <FacturaTitle>
        <h3>Los bosques</h3>
        <h4>fecha</h4>
      </FacturaTitle>
      <FacturaContenido>
        <div>
          <div className="circle"></div>
        </div>
      </FacturaContenido>
    </FacturaContenedor>
  );
}

export default Factura;