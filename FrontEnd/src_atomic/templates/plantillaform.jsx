import styled from "styled-components";

const Form = styled.form`
  height: 100%;
  display: grid;
  align-items: start;
  position: relative;
  gap: 15px;

  .botonForm{
    justify-self: end;
    background: #43523A;
    padding: 10px 20px;
    display: flex;
    gap: 10px;
  }

  input, select, textarea {
    width: 100%;
    padding: 8px 10px;
    border-radius: 3px;
    border: 1px solid gray;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  .doble {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
  }
`;

function PlantillaFormulario({ children }) {
  return (
    <Form>
      {children}

      <button className="botonForm">
        <i class="bi bi-cloud-plus-fill"></i>
        Agregar
      </button>
    </Form>
  );
}

export default PlantillaFormulario;