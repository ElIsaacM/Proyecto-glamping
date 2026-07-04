import React from 'react';
import styled from 'styled-components';

// --- Estilos ---
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-top: 10px;
`;

const DobleRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const InputGroup = styled.div`
  flex: 1; /* Para que ocupen mitad y mitad */
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
  outline: none;
  &:focus {
    border-color: #4a6741;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  color: #555;
  background-color: white;
  outline: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%23555%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8%2011L3%206h10z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;

  &:focus {
    border-color: #4a6741;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  height: 90px;
  resize: none;
  font-size: 14px;
  color: #333;
  outline: none;
  &:focus {
    border-color: #4a6741;
  }
`;

// --- Componente Principal ---
const ServicioForm = () => {
  return (
    <FormContainer>
      
      
      <DobleRow>
        <InputGroup>
          <FormInput type="text" placeholder="Nombre" required />
        </InputGroup>
        <InputGroup>
          <FormSelect defaultValue="">
            <option value="" disabled hidden>Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </FormSelect>
        </InputGroup>
      </DobleRow>

      {/* Fila 2: Encargado y Tipo */}
      <DobleRow>
        <InputGroup>
          <FormInput type="text" placeholder="Encargado" />
        </InputGroup>
        <InputGroup>
          <FormSelect defaultValue="">
            <option value="" disabled hidden>Tipo</option>
            <option value="interno">Interno</option>
            <option value="externo">Externo</option>
          </FormSelect>
        </InputGroup>
      </DobleRow>

  
      <FormTextarea placeholder="Descripcion" />

     
      <DobleRow>
        <InputGroup>
          <FormInput type="text" placeholder="$Precio total" />
        </InputGroup>
        <InputGroup /> 
      </DobleRow>

    </FormContainer>
  );
};

export default ServicioForm;