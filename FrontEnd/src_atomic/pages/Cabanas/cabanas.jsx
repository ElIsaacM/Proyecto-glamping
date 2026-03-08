import styled from "styled-components";

import Plantilla from "../plantilla";
import LinearGraph from "../../components/organisms/graphs/linearGraph";
import SquareCard from "../../components/molecules/cards/squareCard";
import { cabanaCardData } from "./componentsData/cabanaData";
import Buscador from "../../components/molecules/buscador";
import BotonAgregar from "../../components/atoms/buttons/botonAgregar";
import TablaGeneral from "../../components/organisms/tables/tabla";
import { useFetch } from "../../hooks/fetchConnect";
import { useEffect } from "react";
import ModalPlantilla from "../../components/organisms/Modales/modalPlantilla";

import PlantillaFormulario from "../../templates/plantillaform";

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
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData('http://localhost:3000/api/cabins');
  }, [fetchData]);

  return (
    <Plantilla modulo={"Cabanas"}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <LinearGraph />
            <SquareCard squareData={cabanaCardData} />
          </CardsCont>
          <Botones>
            <Buscador placeholder={'Buscar cabana'}></Buscador>

            <BotonAgregar
              modulo={'Agregar cabana'}
              color={1}
              onClick={() => abrirModal(
                <ModalPlantilla modulo={modulo.slice(0, -1).toLowerCase()} onClose={cerrarModal}>
                  <PlantillaFormulario>
                    <input type="text" placeholder="Nombre" required />
                    <textarea type="text" placeholder="Descripcion" />
                    <div className="doble">
                      <input type="text" placeholder="Precio" required />
                      <select name="" id="">
                        <option value="" hidden selected>Estado</option>
                        <option value="">Opcion</option>
                        <option value="">Opcion</option>
                      </select>
                    </div>
                  </PlantillaFormulario>
                </ModalPlantilla>
              )}
            />
          </Botones>

          {loading && <p style={{ marginTop: '20px' }}>Cargando cabañas...</p>}
          {error && <p style={{ marginTop: '20px', color: 'red' }}>Error: {error}</p>}
          {data && <TablaGeneral data={data} />}
        </>
      )}
    </Plantilla>
  );
}

export default Cabanas;
