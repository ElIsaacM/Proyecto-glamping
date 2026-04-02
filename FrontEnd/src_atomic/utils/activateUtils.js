export const activateUtils = {
  activarRegistro: async (modulo, id, nombre, onUpdate) => {
    if (!window.confirm(
      `¿Estás seguro de activar "${nombre}"?`
    )) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${modulo}/activate/${id}`, {
        method: 'PUT'
      });

      if (!res.ok) {
        alert('Error al activar');
      }

      if (onUpdate) {
        onUpdate(`${import.meta.env.VITE_API_BASE_URL}/api/${modulo}`);
      }

    } catch (err) {
      console.error("Error en la petición:", err);
    }
  }
}