import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import { useFilters } from "../../hooks/useFilters";
import { deleteUtils } from "../../utils/deleteUtils";
import { activateUtils } from "../../utils/activateUtils";

import Plantilla from "../plantilla";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import TablaGeneral from "../../components/organisms/tabla";

import ModalAgregar from "./modales/modalAgregar";
import ModalEditar from "./modales/modalEditar";

import ServiciosCards from "./componentsData/serviciosCards";
import Buscador from "./componentsData/serviciosSearch";
import { serviceFilterConfig } from "./componentsData/serviciosSearch";

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
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [servicioAEditar, setServicioAEditar] = useState(null)
  const { data, loading, error, fetchData } = useFetch();

  const [servicios, setServicios] = useState(null);
  const { displayData, setFilterMode, fetchFilters } = useFilters(data, servicios, serviceFilterConfig);
  const [refreshStatsTrigger, setRefreshStatsTrigger] = useState(0);

  const handleFetchData = () => {
    setServicios(null);
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
    fetchFilters();
    setRefreshStatsTrigger(prev => prev + 1);
  }

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
  }, [fetchData]);

  const eliminarServicio = (servicio) => {
    deleteUtils.eliminarRegistro(
      'services',
      servicio.servicio_id,
      servicio.nombre,
      handleFetchData
    );
  }

  const activarServicio = (servicio) => {
    activateUtils.activarRegistro(
      'services',
      servicio.servicio_id,
      servicio.nombre,
      handleFetchData
    );
  }

  const editarServicio = (servicio) => {
    setServicioAEditar(servicio);
    setModalEditarAbierto(true);
  }

  return (
    <Plantilla modulo={'Servicios'}>
      <CardsCont>
        <ServiciosCards refreshTrigger={refreshStatsTrigger} />
      </CardsCont>

      <Botones>
        <Buscador onResult={setServicios} onFilterChange={setFilterMode} />
        <BotonAgregar
          modulo={'Agregar servicio'}
          color={1}
          onClick={() => setModalAbierto(true)}
        />
      </Botones>

      {loading && <p style={{ marginTop: '20px' }}>Cargando servicios...</p>}
      {error && <p style={{ marginTop: '20px', color: 'red' }}>Error: {error}</p>}
      {displayData && (
        <TablaGeneral
          data={displayData}
          onEdit={editarServicio}
          onActive={activarServicio}
          onDelete={eliminarServicio}
        />
      )}

      {modalAbierto && (
        <ModalAgregar
          setModalAbierto={setModalAbierto}
          fetchData={handleFetchData}
        />
      )}

      {modalEditarAbierto && servicioAEditar && (
        <ModalEditar
          setModalAbierto={setModalEditarAbierto}
          fetchData={handleFetchData}
          servicioAEditar={servicioAEditar}
        />
      )}
    </Plantilla>
  );
}

export default Servicios;
