import styled from "styled-components";

function LoginTemplate({ children }) {
  return (
    <Container>
      <Left>
        <img src="./images/login.jpg" alt="" />
      </Left>

      <Right>
        <Content>
          { children }
        </Content>
      </Right>
    </Container>
  );
}

export default LoginTemplate;

const Left = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 35px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  gap: 30px;
  max-width: 450px;

  @media (max-width: 1000px) {
    max-width: 300px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow-y: auto;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #2D7800;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    margin: 20px 0;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #2D7800;
    color: white;
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
  }

  a {
    font-size: 1.2rem;
    font-weight: 400;
    color: #2D7800;
    text-decoration: none;
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1rem;
    }
  }
`;