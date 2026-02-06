import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  width: 80px;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #43523A;
  transition: 0.6s;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h4{
    display: none;
    margin: 0;
  }

  i{
    font-size: 20px;
  }

  .titulo{
    color: white;
    text-align: start;
    width: 100%;
    align-self: center;
  }

  &:hover{
    width: 140px;
    align-items: start;

    h4{
      display: flex;
    }
  }
`;

const ModulesCont = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  ${NavBar}:hover & {
    align-items: flex-start;
  }
`;

const Module = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  border: none;
  background: none;
  color: white;
  cursor: pointer;
`;

function NavBarGeneral({ modules }) {
  const navigate = useNavigate();

  return (
    <NavBar>
      <div>
        <div className="titulo">
          <img src="../../src/assets/Logo glamping.svg" alt="" />
        </div>
        <ModulesCont>
          {modules.map((item, i) => (
            <Module key={i} onClick={() => navigate(item.ruta)}>
              <i className={item.icono}></i>
              <h4>{item.nombre}</h4>
            </Module>
          ))}
        </ModulesCont>
      </div>
      <Module>
        <i className="bi bi-box-arrow-right"></i>
        <h4>Salir</h4>
      </Module>
    </NavBar>
  );
}

export default NavBarGeneral;