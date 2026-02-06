import SelectGeneral from "./select";

function InfoSelect() {
  const opciones = [
    {
      nombre: 'nombre',
      value: 'valor',
    },
    {
      nombre: 'nombre',
      value: 'valor',
    },
    {
      nombre: 'nombre',
      value: 'valor',
    },
    {
      nombre: 'nombre',
      value: 'valor',
    },
    {
      nombre: 'nombre',
      value: 'valor',
    },
  ];

  return(
    <SelectGeneral options={ opciones }></SelectGeneral>
  );
}

export default InfoSelect;