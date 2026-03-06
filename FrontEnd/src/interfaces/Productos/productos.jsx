import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import Plantilla from "../plantilla";
import ProductoCards from "./info/productoCard";
import ProductoGraph from "./info/productoGraph";
import Buscador from "../../components/buscador";
import BotonAgregar from "../../components/buttons/botonAgregar";
import ModalPlantilla from "../../Modales/modalPlantilla";
import TablaGeneral from "../../components/tabla";

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

function Productos() {
  const [modalVisible, setModalVisible] = useState(false);

  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => setModalVisible(false);

  const { data, loading, error, fetchData } = useFetch();
  useEffect(() => {
    fetchData("http://localhost:3000/api/products");
  }, [fetchData]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Plantilla modulo={"Productos"}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <ProductoCards />
            <ProductoGraph />
          </CardsCont>
          <div>
            <Botones>
              <Buscador placeholder={'Buscar producto'} />

              <BotonAgregar
                modulo={'Agregar producto'}
                color={1}
                onClick={() => abrirModal(
                  <ModalPlantilla modulo={modulo.toLowerCase()} onClose={cerrarModal}>

                  </ModalPlantilla>
                )}
              />

            </Botones>
            <ProductoTable />
              <Buscador placeholder={"Buscar producto"} />

              <BotonAgregar
                modulo={"Agregar producto"}
                color={1}
                onClick={() =>
                  abrirModal(
                    <ModalPlantilla
                      modulo={modulo.toLowerCase()}
                      onClose={cerrarModal}
                    />,
                  )
                }
              />
            <TablaGeneral data={data} />
          </div>
        </>
      )}
    </Plantilla>
  );
}

export default Productos;
