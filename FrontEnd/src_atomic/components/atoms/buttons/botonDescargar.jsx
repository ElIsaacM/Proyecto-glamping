import BotonGeneral from "./button";

function BotonDescargar({ onClick }) {
  const data = {
    color: 1,
    icon: 'bi bi-download',
    texto: 'Descargar'
  }

  return(
    <BotonGeneral data={ data } onClick={ onClick }></BotonGeneral>
  );
}

export default BotonDescargar;