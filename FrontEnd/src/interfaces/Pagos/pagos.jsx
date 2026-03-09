import React from "react";
import styled from "styled-components";
import Plantilla from "../plantilla";
import Buscador from "../../components/buscador";
import PagosCard from "./info/pagosCard";
import TablaPagos from "./info/pagosTable";
import Factura from "../../components/factura";

const Botones = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 750px) { flex-direction: column; gap: 10px; }
`;

const TablaFactura = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
`;

function Pagos() {
  return (
    <Plantilla modulo={'Pagos'}>
      {({ abrirModal, cerrarModal }) => (
        <>
          <PagosCard abrirModal={abrirModal} cerrarModal={cerrarModal} />
          <Botones>
            <Buscador placeholder={'Buscar fecha'} />
          </Botones>
          <TablaFactura>
            <TablaPagos className="tabla" />
            <Factura className="factura" />
          </TablaFactura>
        </>
      )}
    </Plantilla>
  );
}

export default Pagos;