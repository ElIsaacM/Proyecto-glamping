import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: 60px;
  box-sizing: border-box;

  color: #343434;

  div{
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

function HeaderGeneral({ user }) {
  return(
    <Header>
      <div>
        <i class="bi bi-arrow-right"></i>
        <h3>Hola, {user}</h3>
      </div>
      <div>
        <i class="bi bi-bell-fill"></i>
        <img width={'30px'} src="../src/assets/Logo glamping.svg" alt="" />
      </div>
    </Header>
  );
}

export default HeaderGeneral;