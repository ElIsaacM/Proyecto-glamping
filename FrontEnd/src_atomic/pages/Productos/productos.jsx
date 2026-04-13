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

import ProductosCards from "./componentsData/productosCards";

import ProductosSearch, {
  productosFilterConfig,
} from "./componentsData/productosSearch";

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

  const [productos, setProductos] = useState(null);
  const { displayData, setFilterMode, fetchFilters } = useFilters(
    data,
    productos,
    productosFilterConfig,
  );
  const [refreshStatsTrigger, setRefreshStatsTrigger] = useState(0);

  const handleFetchData = () => {
    setProductos(null);
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
    fetchFilters();
    setRefreshStatsTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
  }, [fetchData]);

  const eliminarProducto = (producto) => {
    deleteUtils.eliminarRegistro(
      "products",
      producto.id,
      producto.producto,
      handleFetchData,
    );
  };

  const activarProducto = (producto) => {
    activateUtils.activarRegistro(
      "products",
      producto.id,
      producto.producto,
      handleFetchData,
    );
  };

  const editarProducto = (producto) => {
    setProductoAEditar(producto);
    setModalEditarAbierto(true);
  };

  return (
    <Plantilla modulo={"Productos"}>
      <CardsCont>
        <ProductosCards refreshTrigger={refreshStatsTrigger} />
      </CardsCont>

      <Botones>
        <ProductosSearch
          onResult={setProductos}
          onFilterChange={setFilterMode}
        />
        <BotonAgregar
          modulo={"Agregar producto"}
          color={1}
          onClick={() => setModalAbierto(true)}
        />
      </Botones>

      {loading && <p style={{ marginTop: "20px" }}>Cargando productos...</p>}
      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>Error: {error}</p>
      )}
      {displayData && (
        <TablaGeneral
          data={displayData}
          onEdit={editarProducto}
          onDelete={eliminarProducto}
          onActive={activarProducto}
        />
      )}

      {/* 4. Renderizamos el Modal al final, condicionado al booleano */}
      {modalAbierto && (
        <ModalAgregar setModalAbierto={setModalAbierto} fetchData={fetchData} />
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
