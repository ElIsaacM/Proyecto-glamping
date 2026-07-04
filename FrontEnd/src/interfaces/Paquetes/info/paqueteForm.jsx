import React from 'react';
import styled from 'styled-components';

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
  flex: 1;
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

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 35px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
  outline: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%221.5%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%225%22%2F%3E%3Cpath%20d%3D%22M10.5%2010.5L14%2014%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 14px;
  
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

const PaqueteForm = () => {
  return (
    <FormContainer>
      <DobleRow>
        <InputGroup><FormInput type="text" placeholder="Nombre" required /></InputGroup>
        <InputGroup><FormInput type="text" placeholder="Dias" required /></InputGroup>
      </DobleRow>

      <DobleRow>
        <InputGroup><FormInput type="text" placeholder="$ Precio Total" /></InputGroup>
        <InputGroup><SearchInput type="text" placeholder="Cabaña" /></InputGroup>
      </DobleRow>

      <FormTextarea placeholder="Descripción" />

      <DobleRow>
        <InputGroup><SearchInput type="text" placeholder="Productos" /></InputGroup>
        <InputGroup><SearchInput type="text" placeholder="Servicios" /></InputGroup>
      </DobleRow>
    </FormContainer>
  );
};

export default PaqueteForm;