import styled from "styled-components";

const SelectCont = styled.div`
  position: relative;
  display: inline-block;

  i{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    pointer-events: none;
  }
`;

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0 40px 0 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
  background-color: #D9D9D9;
  color: #333;
  font-size: 14px;
`;

function SelectBase({ options }) {
  return (
    <SelectCont>
      <Select>
        {options.map((item, i) => (
          <option key={i} selected={item.selected} hidden={item.selected}>
            {item.nombre}
          </option>
        ))}
      </Select>
      <i className="bi bi-arrow-down"></i>
    </SelectCont>
  );
}

export default SelectBase;