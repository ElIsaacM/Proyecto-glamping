import NavBarGeneral from "./navGeneral";

function InfoNavBar() {
  const modules = [
    {
      icono: "bi bi-microsoft",
      nombre: 'Inicio',
      ruta: '/'
    },
    {
      icono: "bi bi-house-fill",
      nombre: 'Cabanas',
      ruta: '/cabanas'
    },
    {
      icono: "bi bi-box-fill",
      nombre: 'Paquetes',
      ruta: '/paquetes'
    },
    {
      icono: "bi bi-basket3-fill",
      nombre: 'Productos',
      ruta: '/productos'
    },
    {
      icono: "bi bi-ev-front-fill",
      nombre: 'Servicios',
      ruta: '/servicios'
    },
    {
      icono: "bi bi-luggage-fill",
      nombre: 'Reservas',
      ruta: '/reservas'
    },
    {
      icono: "bi bi-credit-card-2-front-fill",
      nombre: 'Pagos',
      ruta: '/pagos'
    },
    {
      icono: "bi bi-person-lines-fill",
      nombre: 'Usuarios',
      ruta: '/usuarios'
    },
  ]

  return(
    <NavBarGeneral modules={ modules }></NavBarGeneral>
  );
}

export default InfoNavBar;