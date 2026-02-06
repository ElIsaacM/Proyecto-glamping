import TablaGeneral from "../../../components/tabla";

function TablaUsuarios() {
  const data = [
    {
      Nombre: 'Alberto Gomez',
      Rol: 'Jardinero',
      Contacto: '3****3243', 
      email: 'e***@example.com', 
      sueldo: '250.000',
    },
    {
      Nombre: 'Juana Alzate',
      Rol: 'Servicio al cliente',
      Contacto: '54****522', 
      email: 'j***@example.com', 
      sueldo: '225.000',
    },
  ];

  return(
    <TablaGeneral data={ data }></TablaGeneral>
  );
}

export default TablaUsuarios;