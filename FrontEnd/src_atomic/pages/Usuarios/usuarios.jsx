import styled from "styled-components";
import { useEffect } from "react";
import { useFetch } from "../../hooks/fetchConnect";

import Plantilla from "../plantilla";
import Buscador from "../../components/molecules/buscador";
import BotonRecargar from "../../components/atoms/buttons/botonRecargar";
import TablaGeneral from "../../components/organisms/tables/tabla";
import LinearCard from "../../components/molecules/cards/linearCard";
import { usuariosCardData, usuariosTableData } from "./componentsData/usuariosData";

const Botones = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 10px;
  }
`;

function Usuarios() {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData('http://localhost:3000/api/users');
  }, [fetchData]);

  return (
    <Plantilla modulo={'Usuarios'}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <LinearCard data={usuariosCardData} />
          <Botones>
            <Buscador placeholder={'Buscar usuario'}></Buscador>
            <BotonRecargar />
          </Botones>
          
          {loading && <p style={{marginTop: '20px'}}>Cargando usuarios...</p>}
          {error && <p style={{marginTop: '20px', color: 'red'}}>Error: {error}</p>}
          <TablaGeneral data={data || usuariosTableData} />
        </>
      )}
    </Plantilla>
  );
}

export default Usuarios;
