import styled from "styled-components";

import ModalPlantilla from "../modalPlantilla";

const BusquedaCont = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  
  button {
    background: #43523A;
    border-radius: 3px;
  }

  input{
    width: 90%;
    padding: 3px;
    justify-self: self-end;

    border-radius: 3px;
    border: 1px solid gray;
  }

  .contenido {
    height: calc(100% - 26px);
  }
`;

function ModalSeleccion({ onClose, data, children }) {
  return (
    <ModalPlantilla volver={1} data={data} onClose={onClose}>
      <BusquedaCont>
        <button>
          Tipo
          <i className="bi bi-arrow-down-short"></i>
        </button>
        <input type="text" placeholder="Buscar" />
      </BusquedaCont>

      <div className="contenido">
        {children}
      </div>
    </ModalPlantilla>
  );
}

export default ModalSeleccion;