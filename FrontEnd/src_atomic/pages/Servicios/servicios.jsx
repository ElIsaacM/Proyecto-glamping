import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import Plantilla from "../plantilla";
import ServicioGraph from "../../components/organisms/graphs/servicioGraph";
import Buscador from "../../components/molecules/buscador";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import ModalPlantilla from "../../components/organisms/Modales/modalPlantilla";
import TablaGeneral from "../../components/organisms/tables/tabla";
import RectangleCard from "../../components/molecules/cards/rectangleCard";
import { serviciosCardData, serviciosTableData } from "./componentsData/serviciosData";

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
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData('http://localhost:3000/api/services');
  }, [fetchData]);

  return (
    <Plantilla modulo={'Servicios'}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <RectangleCard rectangleData={serviciosCardData} />
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
            {loading && <p style={{marginTop: '20px'}}>Cargando servicios...</p>}
            {error && <p style={{marginTop: '20px', color: 'red'}}>Error: {error}</p>}
            <TablaGeneral data={data || serviciosTableData} />
          </div>
        </>
      )}
    </Plantilla>
  );
}

export default Servicios;
