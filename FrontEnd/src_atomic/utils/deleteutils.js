export const deleteUtils = {
  eliminarRegistro: async (modulo, id, nombre, onUpdate) => {
    if (!window.confirm(
      `¿Estás seguro de desactivar/eliminar "${nombre}"?`
    )) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${modulo}/${id}`, {
        method: 'DELETE'
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