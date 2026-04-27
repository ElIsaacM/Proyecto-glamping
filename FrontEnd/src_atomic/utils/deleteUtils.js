export const deleteUtils = {  
  eliminarRegistro: async (modulo, id, nombre, onUpdate) => {
    if (!window.confirm(
      `¿Estás seguro de desactivar/eliminar "${nombre}"?`
    )) return;

    try {
      const userName = localStorage.getItem('userName');

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${modulo}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ userName })
      });

      if (!res.ok) {
        alert('Error al eliminar');
      }

      if (onUpdate) {
        onUpdate(`${import.meta.env.VITE_API_BASE_URL}/api/${modulo}`);
      }

    } catch (err) {
      console.error("Error en la petición:", err);
    }
  }
}