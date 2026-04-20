import NotificacionV1 from "../../../components/molecules/notificacionV1";
import { useFetch } from "../../../hooks/fetchConnect";
import { useEffect } from "react";

function NotificacionInicio() {
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/last`);
  }, [fetchData]);

  return (
    <>
      <NotificacionV1 data={data}></NotificacionV1>
      {console.log(data)}
    </>
  );
}

export default NotificacionInicio;