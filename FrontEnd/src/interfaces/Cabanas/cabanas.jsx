import styled from "styled-components";

import Plantilla from "../plantilla";
import LinearGraph from "../../components/graphs/linearGraph";
import CabanaCard from "./info/cabanaCard";
import Buscador from "../../components/buscador";
import BotonAgregar from "../../components/buttons/botonAgregar";
import TablaCabanas from "./info/tablaCabanas";
import ModalPlantilla from "../../Modales/modalPlantilla";
import PlantillaFormulario from "../../components/plantillaform";
import GestorImagenes from "./info/gestorImagenes";


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
  return (
    <Plantilla modulo={"Cabanas"}>
      {({ abrirModal, cerrarModal, modulo }) => (
        <>
          <CardsCont>
            <LinearGraph />
            <CabanaCard />
          </CardsCont>
          <Botones>
            <Buscador placeholder={'Buscar cabana'}></Buscador>

        <BotonAgregar
  modulo={'Agregar cabana'}
  color={1}
  onClick={() =>
    abrirModal(
      <ModalPlantilla
        modulo={modulo.slice(0, -1).toLowerCase()}
        onClose={cerrarModal}
      >
        <PlantillaFormulario>
          <input type="text" placeholder="Nombre" required />

          <textarea placeholder="Descripcion" />

          <div className="doble">
            <input type="number" placeholder="Precio" required />

            <select defaultValue="">
              <option value="" disabled hidden>
                Estado
              </option>
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
            </select>
          </div>

          <button type="submit" className="btn-agregar">
            
          </button>
        </PlantillaFormulario>
      </ModalPlantilla>
    )
  }
/>
          </Botones>
          <TablaCabanas />
          <GestorImagenes />
        </>
      )}
    </Plantilla>
  );
}

export default Cabanas;
