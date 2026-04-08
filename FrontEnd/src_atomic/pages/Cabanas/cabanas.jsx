import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import { deleteUtils } from "../../utils/deleteUtils";

import Plantilla from "../plantilla";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import TablaGeneral from "../../components/organisms/tabla";
import ModalAgregar from "./modales/modalAgregar";
import ModalEditar from "./modales/modalEditar";

import CabanasCard from "./componentsData/cabanaCard";
import Buscador from "../../components/molecules/buscador";

const Botones = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 10px;
  }
`;

function Cabanas() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [cabanaAEditar, setCabanaAEditar] = useState(null);

  const [refreshStatsTrigger, setRefreshStatsTrigger] = useState(0);

  const { data, loading, error, fetchData } = useFetch();

  const handleFetchData = () => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/cabins`);
    setRefreshStatsTrigger(prev => prev + 1);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const eliminarCabana = async (cabana) => {
    deleteUtils.eliminarRegistro(
      'cabins',
      cabana.cabanaid,
      cabana.nombre,
      handleFetchData
    );
  }

  const editarCabana = (cabana) => {
    setCabanaAEditar(cabana);
    setModalEditarAbierto(true);
  }

  return (
    <Plantilla modulo={"Cabanas"}>
      <CabanasCard refreshTrigger={refreshStatsTrigger} />

      <Botones>
        <Buscador placeholder={'Buscar cabana'} />
        <BotonAgregar
          modulo={'Agregar cabana'}
          color={1}
          onClick={() => setModalAbierto(true)}
        />
      </Botones>

      {loading && <p style={{ marginTop: '20px' }}>Cargando cabañas...</p>}
      {error && <p style={{ marginTop: '20px', color: 'red' }}>Error: {error}</p>}
      {data && <TablaGeneral data={data} onEdit={editarCabana} onDelete={eliminarCabana} />}

      {modalAbierto && (
        <ModalAgregar
          setModalAbierto={setModalAbierto}
          fetchData={handleFetchData}
        />
      )}

      {modalEditarAbierto && cabanaAEditar && (
        <ModalEditar
          setModalAbierto={setModalEditarAbierto}
          fetchData={handleFetchData}
          cabanaAEditar={cabanaAEditar}
        />
      )}
    </Plantilla>
  );
}

export default Cabanas;
