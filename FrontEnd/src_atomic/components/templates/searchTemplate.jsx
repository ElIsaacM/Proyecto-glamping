import styled from "styled-components";

import { useState } from "react";
import { useSearch } from "../../hooks/useSearch";

import SelectBase from "../atoms/select/selectBase";

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

function SearchTemplate({ modulo, placeholder, onResult, options, onFilterChange }) {
  const [filter, setFilter] = useState(options[0]?.nombre || "");
  const { searchTerm, setSearchTerm } = useSearch(modulo, onResult);

  // Manejar el cambio de filtro
  const handleFilterChange = (e) => {
    const newValue = e.target.value;
    setFilter(newValue);
    if (onFilterChange) onFilterChange(newValue);
  };

  return (
    <Buscador_Filtro>
      <Buscar>
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Buscar>
      <SelectBase options={options} value={filter} onChange={handleFilterChange} />
    </Buscador_Filtro>
  );
}

export default SearchTemplate;
