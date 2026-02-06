import SelectGeneral from "../../../../components/select/select";

function SelectPrecio() {
  const data = [
    {
      nombre: 'Tipo',
      value: 'valor',
    },
    {
      nombre: 'opcion',
      value: 'selected',
    },
    {
      nombre: 'opcion',
      value: 'valor',
    },
  ];

  return(
    <SelectGeneral options={ data }></SelectGeneral>
  );
}

export default SelectPrecio;