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
  
  button{
    background-color: transparent;
    border: none;
    color: #343434;
    font-size: 20px;
    cursor: pointer;
  }
`;

function HeaderGeneral({ user, onClick }) {
  return(
    <Header>
      <div>
        <i class="bi bi-arrow-right"></i>
        <h3>Hola, {user}</h3>
      </div>
      <div>
        <button onClick={ onClick }>
          <i class="bi bi-bell-fill" />
        </button>
        
        <img width={'30px'} src="/images/Logo.svg" alt="" />
      </div>
    </Header>
  );
}

export default HeaderGeneral;