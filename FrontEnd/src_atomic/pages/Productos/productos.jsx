import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import { deleteUtils } from "../../utils/deleteutils";

import Plantilla from "../plantilla";
import ProductoGraph from "../../components/organisms/graphs/productoGraph";
import Buscador from "../../components/molecules/buscador";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import TablaGeneral from "../../components/organisms/tables/tabla";
import RectangleCard from "../../components/molecules/cards/rectangleCard";
import { productosCardData } from "./componentsData/productosData";
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

function Productos() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
  }, [fetchData]);

  const eliminarProducto = (producto) => {
    deleteUtils.eliminarRegistro(
      'products',
      producto.productoid,
      producto.nombre,
      () => fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
    );
  }

  const editarProducto = (producto) => {
    setProductoAEditar(producto);
    setModalEditarAbierto(true);
  };

  return (
    <Plantilla modulo={'Productos'}>
      <CardsCont>
        <RectangleCard rectangleData={productosCardData} />
        <ProductoGraph />
      </CardsCont>
      <div>
        <Botones>
          <Buscador placeholder={'Buscar producto'} />
          <BotonAgregar
            modulo={'Agregar producto'}
            color={1}
            onClick={() => setModalAbierto(true)}
          />
        </Botones>

        {loading && <p style={{ marginTop: '20px' }}>Cargando productos...</p>}
        {error && <p style={{ marginTop: '20px', color: 'red' }}>Error: {error}</p>}
        {data && <TablaGeneral data={data} onEdit={editarProducto} onDelete={eliminarProducto} />}
      </div>

      {/* 4. Renderizamos el Modal al final, condicionado al booleano */}
      {modalAbierto && (
        <ModalAgregar
          setModalAbierto={setModalAbierto}
          fetchData={fetchData}
        />
      )}

      {/* Renderizamos modulo de edición */}
      {modalEditarAbierto && productoAEditar && (
        <ModalEditar
          setModalAbierto={setModalEditarAbierto}
          fetchData={fetchData}
          productoAEditar={productoAEditar}
        />
      )}
    </Plantilla>
  );
}

export default Productos;
