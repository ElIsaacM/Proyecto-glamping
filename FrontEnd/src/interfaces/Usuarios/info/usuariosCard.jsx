import React from "react";
import styled from "styled-components";
import LinearCard from "../../../components/cards/linearCard";
// Rutas corregidas para subir 3 niveles (info -> Usuarios -> interfaces -> src)
import ModalPlantilla from "../../../Modales/modalPlantilla"; 
import PlantillaFormulario from "../../../components/plantillaform";

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
  & > input, & > select { flex: 1; }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 30%;
`;

// Recibimos las funciones entre llaves { }
function UsuariosCard({ abrirModal, cerrarModal }) {

  const manejarAbrirModal = () => {
    // Verificamos que abrirModal exista antes de usarlo
    if (typeof abrirModal === 'function') {
      abrirModal(
        <ModalPlantilla modulo="nuevo usuario" onClose={cerrarModal}>
          <PlantillaFormulario>
            <FormGrid>
              <Row>
                <Input type="text" placeholder="Nombre" />
                <Input type="text" placeholder="Cargo" />
              </Row>
              <Row>
                <Input type="text" placeholder="Numero de documento" style={{ flex: 2 }} />
                <Select>
                  <option value="CC">CC</option>
                  <option value="pasaporte">Pasaporte</option>
                  <option value="CE">CE</option>
                </Select>
              </Row>
              <Input type="email" placeholder="Correo electrónico" />
              <Input type="password" placeholder="Contraseña" />
              <Input type="text" placeholder="$Salario mensual" style={{ width: '50%' }} />
            </FormGrid>
          </PlantillaFormulario>
        </ModalPlantilla>
      );
    }
  };

  const data = [
    {
      bgColor: '',
      colorTitulo: '#28a745',
      texto: 'Ultimos agregados',
      titulo: '13',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#ffc107',
      texto: 'Usuarios de mantenimiento',
      titulo: '25',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: '',
      colorTitulo: '#dc3545',
      texto: 'Usuarios inactivos',
      titulo: '149',
      icon: 'bi bi-rocket-takeoff-fill',
    },
    {
      bgColor: 'verde',
      colorTitulo: '',
      texto: '',
      titulo: 'Agregar usuario',
      icon: 'bi bi-person-plus-fill',
      onClick: manejarAbrirModal,
    },
  ];

  return <LinearCard data={data} />;
}

export default UsuariosCard;