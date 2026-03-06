import BotonGeneral from "./button";

function BotonAgregar({ modulo, onClick }) {
  const data = {
    color: 1,
    icon: 'bi bi-cloud-plus-fill',
    texto: `${modulo}`
  }

  return (
    <BotonGeneral data={data} onClick={ onClick } ></BotonGeneral>
  );
}

export default BotonAgregar;