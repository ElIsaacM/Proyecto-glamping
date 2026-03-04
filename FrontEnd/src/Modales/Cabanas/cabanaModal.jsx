import styled from "styled-components";
import { useState } from "react";

import ModalPlantilla from "../modalPlantilla";
import ModalFormulario from "../modalFormulario";

const Contenido = styled.div`
  width: 100%;
  height: 100%;

  input,
  textarea {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid;
    margin-bottom: 10px;
    padding: 10px;
  }

  textarea {
    max-width: 100%;
    min-height: 60px;
    resize: vertical;
  }
`;

function ModalCabana({ onClose }) {
  const confirmarCabana = () => {
    console.log("Cabana confirmada");
    onClose(); // cerrar modal principal
  };

  const [selectVisible, setSelectVisible] = useState(false);

  const seleccion = () => {
    setSelectVisible(true);
  };

  const volver = () => {
    setSelectVisible(false);
  };

  return (
    <ModalPlantilla
      data={"Agregar cabana"}
      onClose={onClose}
      onConfirm={confirmarCabana}
    >
      <ModalFormulario>
        
        <Contenido>
          <input type="text" placeholder="Cabana" />
          <textarea type="text" placeholder="Descripcion" />
          <input type="text" placeholder="$ Precio noche" />
          <input type="text" placeholder="Estado" />
          <button onClick={seleccion}>Seleccionar</button>
          <button onClick={volver}>Ocultar</button>
        </Contenido>
        
      </ModalFormulario>
    </ModalPlantilla>
  );
}

export default ModalCabana;
