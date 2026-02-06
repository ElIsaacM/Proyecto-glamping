import { useState, useEffect } from "react";

function ObtenerHora() {
  const [hora, setHora] = useState('');

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const formatoHora = ahora.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setHora(formatoHora);
    }

    actualizarHora();
    const intervalo = setInterval(actualizarHora, 30000);

    return() => clearInterval(intervalo);
  }, []);

  return( 
    <h3>{hora}</h3>
  );
}

export default ObtenerHora;