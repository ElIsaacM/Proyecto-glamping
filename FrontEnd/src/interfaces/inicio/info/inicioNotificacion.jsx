import NotificacionV1 from "../../../components/notificacionV1";

function NotificacionInicio() {
  const data = [
    {
      titulo: 'Los bosques',
      asunto: 'Mantenimiento a la cabana 2',
      texto: 'Recuerda que el mantenimiento de la cabana es el jueves 20 de agosto, esta programado con el tecnico Jose'
    },
    {
      titulo: 'Los bosques',
      asunto: 'Mantenimiento a la cabana 2',
      texto: 'Recuerda que el mantenimiento de la cabana es el jueves 20 de agosto, esta programado con el tecnico Jose'
    }
  ];

  return(
    <NotificacionV1 data={ data }></NotificacionV1>
  );
}

export default NotificacionInicio;