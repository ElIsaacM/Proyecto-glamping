import BotonGeneral from "./button";

function BotonEntendido({ onClose }) {
  const data = {
    color: 1,
    icon: '',
    texto: 'Entendido'
  }

  return(
    <BotonGeneral data={ data } onClick={ onClose }></BotonGeneral>
  );
}

export default BotonEntendido;