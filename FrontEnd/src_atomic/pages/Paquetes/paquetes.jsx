import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import { deleteUtils } from "../../utils/deleteUtils";

import Plantilla from "../plantilla";
import PaqueteGraph from "../../components/organisms/graphs/paqueteGraph";
import Buscador from "../../components/molecules/buscador";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import ModalPlantilla from "../../components/organisms/Modales/modalPlantilla";
import TablaGeneral from "../../components/organisms/tabla";
import RectangleCard from "../../components/molecules/cards/rectangleCard";
import { paquetesCardData, paquetesTableData } from "./componentsData/paquetesData";

import ModalAgregar from "./modales/modalAgregar";
import ModalEditar from "./modales/modalEditar";

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

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages`);
  }, [fetchData]);


  const eliminarPaquete = (paquete) => {
    deleteUtils.eliminarRegistro(
      'packages',
      paquete.paquete_id,
      paquete.nombre,
      () => fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages`)
    );
  }

  const editarPaquete = (paquete) => {
    setPaqueteAEditar(paquete);
    setModalEditarAbierto(true);
  }

  return (
    <Plantilla modulo="Paquetes">
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
                onClick={() => setModalAbierto(true)}
              />
            </Botones>

            {loading && <p style={{marginTop: '20px'}}>Cargando paquetes...</p>}
            {error && <p style={{marginTop: '20px', color: 'red'}}>Error: {error}</p>}
            {data && <TablaGeneral data={data} onEdit={editarPaquete} onDelete={eliminarPaquete} />}
          </div>

          {modalAbierto && (
            <ModalAgregar
              setModalAbierto={setModalAbierto}
              fetchData={fetchData}
            />
          )}

          {modalEditarAbierto && paqueteAEditar && (
            <ModalEditar
              setModalAbierto={setModalEditarAbierto}
              fetchData={fetchData}
              paqueteAEditar={paqueteAEditar}
            />
          )}
    </Plantilla>
  );
}

export default Paquetes;
