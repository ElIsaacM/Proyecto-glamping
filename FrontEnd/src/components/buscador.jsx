import styled from "styled-components";
import SelectBase from "./select/select-base";

const Buscador_Filtro = styled.div`
  display: flex;
  gap: 20px;
`;

const Buscar = styled.div`
  width: 300px;
  height: 40px;
  position: relative;

  input{
    width: 100%;
    height: 100%;
    padding: 0 0 0 40px;
    background: #D9D9D9;
    border: 0px;
    border-radius: 5px;
  }

  i{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #4b4b4b;
  }
`;

function Buscador({ placeholder }) {
  const data = [
    {
      nombre: 'Tipo',
      selected: 'selected',
    },
    {
      nombre: 'Fecha ASC',
      selected: ''
    },
    {
      nombre: 'Precio DESC',
      selected: ''
    },
  ];

  return (
    <Buscador_Filtro>
      <Buscar>
        <i class="bi bi-search"></i>
        <input type="text" placeholder={placeholder} />
      </Buscar>
      <SelectBase options={ data }/>
    </Buscador_Filtro>
  );
}

export default Buscador;