import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

// Estilos para el botón/tarjeta
const CardButton = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &.verde {
    background-color: #43523a;
    color: white;
  }
`;

const LinearCard = ({ data }) => {
  return (
    <CardContainer>
      {data.map((item, index) => (
        <CardButton 
          key={index} 
          className={item.bgColor} 
          onClick={item.onClick} // ¡ESTA LÍNEA ES LA QUE ACTIVA EL MODAL!
        >
          <i className={item.icon} style={{ fontSize: '24px' }}></i>
          <h3>{item.titulo}</h3>
          <p>{item.texto}</p>
        </CardButton>
      ))}
    </CardContainer>
  );
};

export default LinearCard;