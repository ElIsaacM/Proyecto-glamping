import BotonGeneral from "./button";

function BotonRecargar() {
  const data = {
    color: 1,
    icon: 'bi bi-arrow-clockwise',
    texto: ''
  }

  return(
    <BotonGeneral data={ data }></BotonGeneral>
  );
}

export default BotonRecargar;