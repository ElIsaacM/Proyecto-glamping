import React from "react";
import styled from "styled-components";
import LinearCard from "../../../components/cards/linearCard";
import ModalPlantilla from "../../../Modales/modalPlantilla"; 

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  width: 450px; /* Tamaño normal sin scroll */
  max-width: 90vw;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
  & > input { flex: 1; }
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  &:focus { border-color: #43523a; }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 10px;
  background: white;
  width: 90px;
  select { border: none; outline: none; width: 100%; padding: 10px 0; cursor: pointer; }
`;

const BotonAgregar = styled.button`
  background-color: #43523a;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;
`;

function PagosCard({ abrirModal, cerrarModal }) {
  const manejarAbrirModal = () => {
    if (typeof abrirModal === 'function') {
      abrirModal(
        <ModalPlantilla modulo="Agregar Nuevo usuario" onClose={cerrarModal}>
          <FormContainer>
            <Row>
              <Input type="text" placeholder="Nombre" />
              <Input type="text" placeholder="Cargo" />
            </Row>
            <Row>
              <Input type="text" placeholder="Numero de documento" style={{ flex: 3 }} />
              <SelectContainer>
                <select><option>CC</option><option>CE</option></select>
              </SelectContainer>
            </Row>
            <Input type="email" placeholder="Correo electrónico" />
            <Input type="password" placeholder="Contraseña" />
            <Input type="text" placeholder="$Salario mensual" style={{ width: '50%' }} />
            <BotonAgregar onClick={cerrarModal}>
              <i className="bi bi-plus-circle"></i> Agregar
            </BotonAgregar>
          </FormContainer>
        </ModalPlantilla>
      );
    }
  };

  const data = [
    { bgColor: '', colorTitulo: '#28a745', texto: 'Ultimos pagos', titulo: '13', icon: 'bi bi-rocket-takeoff-fill' },
    { bgColor: '', colorTitulo: '#ffc107', texto: 'Pagos cancelados', titulo: '25', icon: 'bi bi-rocket-takeoff-fill' },
    { bgColor: '', colorTitulo: '#dc3545', texto: 'Pagos incompletos', titulo: '149', icon: 'bi bi-rocket-takeoff-fill' },
    { bgColor: 'verde', titulo: 'Agregar usuario', icon: 'bi bi-person-plus-fill', onClick: manejarAbrirModal }
  ];

  return <LinearCard data={data} />;
}

export default PagosCard;