import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import { useFilters } from "../../hooks/useFilters";
import { deleteUtils } from "../../utils/deleteUtils";
import { activateUtils } from "../../utils/activateUtils";

import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import TablaGeneral from "../../components/organisms/tabla";

import ModalAgregar from "./modales/modalAgregar";
import ModalEditar from "./modales/modalEditar";

import PaquetesCards from "./componentsData/paquetesCards";
import PaquetesSearch, {
  paquetesFilterConfig,
} from "./componentsData/paquetesSearch";

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
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [paqueteAEditar, setPaqueteAEditar] = useState(null);
  const { data, loading, error, fetchData } = useFetch();

  const [paquetes, setPaquetes] = useState(null);
  const { displayData, setFilterMode, fetchFilters } = useFilters(
    data,
    paquetes,
    paquetesFilterConfig,
  );
  const [refreshStatsTrigger, setRefreshStatsTrigger] = useState(0);

  const handleFetchData = () => {
    setPaquetes(null);
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages`);
    fetchFilters();
    setRefreshStatsTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages`);
  }, [fetchData]);

  const eliminarPaquete = (paquete) => {
    deleteUtils.eliminarRegistro(
      'packages',
      paquete.id,
      paquete.nombre,
      handleFetchData,
    );
  };

  const activarPaquete = (paquete) => {
    activateUtils.activarRegistro(
      "packages",
      paquete.id,
      paquete.nombre,
      handleFetchData,
    );
  };

  const editarPaquete = (paquete) => {
    setPaqueteAEditar(paquete);
    setModalEditarAbierto(true);
  };

  return (
    <>
      <CardsCont>
        <PaquetesCards refreshTrigger={refreshStatsTrigger} />
      </CardsCont>

      <Botones>
        <PaquetesSearch onResult={setPaquetes} onFilterChange={setFilterMode} />
        <BotonAgregar
          modulo="Agregar paquete"
          color={1}
          onClick={() => setModalAbierto(true)}
        />
      </Botones>

      {loading && <p style={{ marginTop: "20px" }}>Cargando paquetes...</p>}
      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>Error: {error}</p>
      )}
      {displayData && (
        <TablaGeneral
          data={displayData}
          onEdit={editarPaquete}
          onDelete={eliminarPaquete}
          onActive={activarPaquete}
        />
      )}

      {modalAbierto && (
        <ModalAgregar
          setModalAbierto={setModalAbierto}
          fetchData={handleFetchData}
        />
      )}

      {modalEditarAbierto && paqueteAEditar && (
        <ModalEditar
          setModalAbierto={setModalEditarAbierto}
          fetchData={handleFetchData}
          paqueteAEditar={paqueteAEditar}
        />
      )}
    </>
  );
}

export default Paquetes;
