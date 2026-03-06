import BotonGeneral from "./button";

function BotonDescargar() {
  const data = {
    color: 1,
    icon: 'bi bi-download',
    texto: 'Descargar'
  }

  return(
    <BotonGeneral data={ data }></BotonGeneral>
  );
}

export default BotonDescargar;