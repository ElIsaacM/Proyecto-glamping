import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import Plantilla from "../plantilla";
import PaqueteGraph from "../../components/organisms/graphs/paqueteGraph";
import Buscador from "../../components/molecules/buscador";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import ModalPlantilla from "../../components/organisms/Modales/modalPlantilla";
import TablaGeneral from "../../components/organisms/tables/tabla";
import RectangleCard from "../../components/molecules/cards/rectangleCard";
import { paquetesCardData, paquetesTableData } from "./componentsData/paquetesData";

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
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData('http://localhost:3000/api/packages');
  }, [fetchData]);

  return (
    <Plantilla modulo="Paquetes">
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <RectangleCard rectangleData={paquetesCardData} />
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
            {loading && <p style={{marginTop: '20px'}}>Cargando paquetes...</p>}
            {error && <p style={{marginTop: '20px', color: 'red'}}>Error: {error}</p>}
            <TablaGeneral data={data || paquetesTableData} />
          </div>
        </>
      )}
    </Plantilla>
  );
}

export default Paquetes;
