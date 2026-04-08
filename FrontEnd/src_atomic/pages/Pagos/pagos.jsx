import styled from "styled-components";
import {useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import Plantilla from "../plantilla";
import Buscador from "../../components/molecules/buscador";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import LinearCard from "../../components/molecules/cards/linearCard";
import TablaGeneral from "../../components/organisms/tabla";
import { pagosCardData } from "./componentsData/pagosData";

import ModalAgregar from "./modales/modalAgregar";

const ModulosExtra = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  button {
    padding: 10px;
    background-color: #eeeeeeff;
    color: #363636;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      background-color: #d9d9d9ff;
    }
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

const TablaFactura = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  height: 100vh;
`;

function Pagos() {
  const [modalAbierto, setModalAbierto] = useState(false)

  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/payments`);
  }, [fetchData]);

  return (
    <Plantilla modulo={'Pagos'}>
      <LinearCard data={pagosCardData} />
      <div>
        <ModulosExtra>
          <button className="module-button"
            onClick={() => fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/payments`)}
          >Pagos</button>
          <button className="module-button"
            onClick={() => fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products`)}
          >reembolsos</button>
          <button className="module-button"
            onClick={() => fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/invoices`)}
          >facturas</button>
        </ModulosExtra>
        
        <Botones>
          <Buscador placeholder={'Buscar fecha'} />
          <BotonAgregar
            modulo={'Agregar pago'}
            color={1}
            onClick={() => setModalAbierto(true)}
          />
        </Botones>

        {loading && <p style={{ marginTop: '20px' }}>Cargando productos...</p>}
        {error && <p style={{ marginTop: '20px', color: 'red' }}>Error: {error}</p>}
        {data && <TablaGeneral data={data} />}
      </div>

      {modalAbierto && (
        <ModalAgregar
          setModalAbierto={setModalAbierto}
          fetchData={fetchData}
        />
      )}
    </Plantilla>
  );
}

export default Pagos;
