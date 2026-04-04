import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import { deleteUtils } from "../../utils/deleteUtils";

import Plantilla from "../plantilla";
import LinearGraph from "../../components/organisms/graphs/linearGraph";
import SquareCard from "../../components/molecules/cards/squareCard";
import { cabanaCardData } from "./componentsData/cabanaData";
import Buscador from "../../components/molecules/buscador";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import TablaGeneral from "../../components/organisms/tabla";

import ModalAgregar from "./modales/modalAgregar";
import ModalEditar from "./modales/modalEditar";

const CardsCont = styled.div`
  margin: 50px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

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

  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/cabins`);
  }, [fetchData]);

  const eliminarCabana = async (cabana) => {
    deleteUtils.eliminarRegistro(
      'cabins',
      cabana.cabanaid,
      cabana.nombre,
      () => fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/cabins`)
    );
  }

  const editarCabana = (cabana) => {
    setCabanaAEditar(cabana);
    setModalEditarAbierto(true);
  }

  return (
    <Plantilla modulo={"Cabanas"}>
      <CardsCont>
        <LinearGraph />
        <SquareCard squareData={cabanaCardData} />
      </CardsCont>

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
          fetchData={fetchData}
        />
      )}

      {modalEditarAbierto && cabanaAEditar && (
        <ModalEditar
          setModalAbierto={setModalEditarAbierto}
          fetchData={fetchData}
          cabanaAEditar={cabanaAEditar}
        />
      )}
    </Plantilla>
  );
}

export default Cabanas;
