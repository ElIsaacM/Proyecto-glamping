import styled from "styled-components";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)

import Plantilla from "../plantilla";
import ProductoCards from "./info/productoCard";
import ProductoGraph from "./info/productoGraph";
import Buscador from "../../components/buscador";
import BotonAgregar from "../../components/buttons/botonAgregar";
<<<<<<< HEAD
import ProductoTable from "./info/productoTable";
import ModalPlantilla from "../../Modales/modalPlantilla";
=======
import ModalPlantilla from "../../Modales/modalPlantilla";
import TablaGeneral from "../../components/tabla";
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)

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

<<<<<<< HEAD
  return (
    <Plantilla modulo={'Productos'}>
=======
  const { data, loading, error, fetchData } = useFetch();
  useEffect(() => {
    fetchData("http://localhost:3000/api/products");
  }, [fetchData]);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Plantilla modulo={"Productos"}>
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <ProductoCards />
            <ProductoGraph />
          </CardsCont>
          <div>
            <Botones>
<<<<<<< HEAD
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
=======
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
            </Botones>
            <TablaGeneral data={data} />
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)
          </div>
        </>
      )}
    </Plantilla>
  );
}

<<<<<<< HEAD
export default Productos;
=======
export default Productos;
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)
