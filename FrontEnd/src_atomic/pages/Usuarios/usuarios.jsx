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

import UsuariosCard from "./componentsData/usuariosCards";
import UsuariosSearch, {
  userFilterConfig,
} from "./componentsData/usuariosSearch";

const Botones = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 10px;
  }
`;

function Usuarios() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const { data, loading, error, fetchData } = useFetch();

  const [usuarios, setUsuarios] = useState(null);
  const { displayData, setFilterMode, fetchFilters } = useFilters(
    data,
    usuarios,
    userFilterConfig,
  );
  const [refreshStatsTrigger, setRefreshStatsTrigger] = useState(0);

  const handleFetchData = () => {
    setUsuarios(null); // Clear search to show updated table
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
    fetchFilters();
    setRefreshStatsTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
  }, [fetchData]);

  const eliminarUsuario = (usuario) => {
    deleteUtils.eliminarRegistro(
      "users",
      usuario.id,
      usuario.usuario,
      handleFetchData,
    );
  };

  const activarUsuario = (usuario) => {
    activateUtils.activarRegistro(
      "users",
      usuario.id,
      usuario.usuario,
      handleFetchData,
    );
  };

  const editarUsuario = (usuario) => {
    setUsuarioAEditar(usuario);
    setModalEditarAbierto(true);
  };

  return (
    <>
      <UsuariosCard refreshTrigger={refreshStatsTrigger} />
      <Botones>
        <UsuariosSearch onResult={setUsuarios} onFilterChange={setFilterMode} />
        <BotonAgregar
          modulo={"Agregar usuario"}
          color={1}
          onClick={() => setModalAbierto(true)}
        />
      </Botones>

      {loading && <p style={{ marginTop: "20px" }}>Cargando usuarios...</p>}
      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>Error: {error}</p>
      )}
      {displayData && (
        <TablaGeneral
          data={displayData}
          onEdit={editarUsuario}
          onActive={activarUsuario}
          onDelete={eliminarUsuario}
        />
      )}

      {modalAbierto && (
        <ModalAgregar
          setModalAbierto={setModalAbierto}
          fetchData={handleFetchData}
        />
      )}

      {modalEditarAbierto && usuarioAEditar && (
        <ModalEditar
          setModalAbierto={setModalEditarAbierto}
          fetchData={handleFetchData}
          usuarioAEditar={usuarioAEditar}
        />
      )}
    </>
  );
}

export default Usuarios;
