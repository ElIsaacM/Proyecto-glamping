import styled from "styled-components";
import { useState } from "react";

import Plantilla from "../plantilla";
import PaqueteCards from "./info/paqueteCard";
import PaqueteGraph from "./info/paqueteGraph";
import Buscador from "../../components/buscador";
import BotonAgregar from "../../components/buttons/botonAgregar";
import PaqueteTable from "./info/paqueteTable";
import ModalPlantilla from "../../Modales/modalPlantilla";

const CardsCont = styled.div`
  margin: 50px 0;

  display: grid;
  grid-template-columns: 65% 30%;
  align-items: center;
  gap: 20px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Botones = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 10px;
  }
`;

function Paquetes() {
  return (
    <Plantilla modulo="Paquetes">
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <PaqueteCards />
            <PaqueteGraph />
          </CardsCont>

          <div>
            <Botones>
              <Buscador placeholder="Buscar paquete" />

              <BotonAgregar
                modulo="Agregar paquete"
                color={1}
                onClick={() => abrirModal(
                  <ModalPlantilla modulo={modulo.toLowerCase()} onClose={cerrarModal}>
                    <input type="text" placeholder="Nombre" />
                  </ModalPlantilla>
                )}
              />

            </Botones>
            <PaqueteTable />
          </div>
        </>
      )}
    </Plantilla>
  );
}

export default Paquetes;