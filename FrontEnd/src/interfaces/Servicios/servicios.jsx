import styled from "styled-components";
import { useState } from "react";

import Plantilla from "../plantilla";
import ServicioCards from "./info/servicioCard";
import ServicioGraph from "./info/servicioGraph";
import Buscador from "../../components/buscador";
import BotonAgregar from "../../components/buttons/botonAgregar";
import ServicioTable from "./info/servicioTable";
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

function Servicios() {
  return (
    <Plantilla modulo={'Servicios'}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <ServicioCards />
            <ServicioGraph />
          </CardsCont>
          <div>
            <Botones>
                <Buscador placeholder={'Buscar servicio'} />
              <BotonAgregar 
                modulo={'Agregar servicio'} 
                color={1} 
                onClick={() => abrirModal(
                  <ModalPlantilla modulo={modulo.toLowerCase()} onClose={cerrarModal}>

                  </ModalPlantilla>
                )} 
              />
            </Botones>
            <ServicioTable />
          </div>
        </>
      )}
    </Plantilla>
  );
}

export default Servicios;