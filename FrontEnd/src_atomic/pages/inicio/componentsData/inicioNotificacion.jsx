import NotificacionV1 from "../../../components/molecules/notificacionV1";
import { useFetch } from "../../../hooks/fetchConnect";
import { useEffect } from "react";

function NotificacionInicio() {
  const { data, fetchData } = useFetch();

  const handleFetchData = () => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/last`);
  };

  useEffect(() => {
    handleFetchData();
  }, [fetchData]);

  const handleDelete = async (notificacion_id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/${notificacion_id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "true"
        }
      });
      if (res.ok) handleFetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NotificacionV1 data={data} handleDelete={handleDelete}></NotificacionV1>
  );
}

export default NotificacionInicio;