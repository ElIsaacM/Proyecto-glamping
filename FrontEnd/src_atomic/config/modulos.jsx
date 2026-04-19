import Inicio from "../pages/inicio/inicio"
import Cabanas from "../pages/Cabanas/cabanas"
import Paquetes from "../pages/Paquetes/paquetes"
import Productos from "../pages/Productos/productos"
import Servicios from "../pages/Servicios/servicios"
import Reservas from "../pages/Reservas/reservas"
import Pagos from "../pages/Pagos/pagos"
import Usuarios from "../pages/Usuarios/usuarios"

export const userRole = localStorage.getItem('userRole') || "";

export const modulos = [
  {
    icono: "bi bi-microsoft",
    nombre: 'Inicio',
    componente: <Inicio />,
    ruta: '/inicio'
  },
  {
    icono: "bi bi-house-fill",
    nombre: 'Cabanas',
    componente: <Cabanas />,
    ruta: '/cabanas'
  },
  {
    icono: "bi bi-box-fill",
    nombre: 'Paquetes',
    componente: <Paquetes />,
    ruta: '/paquetes'
  },
  {
    icono: "bi bi-basket3-fill",
    nombre: 'Productos',
    componente: <Productos />,
    ruta: '/productos'
  },
  {
    icono: "bi bi-ev-front-fill",
    nombre: 'Servicios',
    componente: <Servicios />,
    ruta: '/servicios'
  },
  {
    icono: "bi bi-luggage-fill",
    nombre: 'Reservas',
    componente: <Reservas />,
    ruta: '/reservas',
    roles: ["recepcionista", "administrador"]
  },
  {
    icono: "bi bi-credit-card-2-front-fill",
    nombre: 'Pagos',
    componente: <Pagos />,
    ruta: '/pagos',
    roles: ["recepcionista", "administrador"]
  },
  {
    icono: "bi bi-person-lines-fill",
    nombre: 'Usuarios',
    componente: <Usuarios />,
    ruta: '/usuarios',
    roles: ["administrador"]
  },
];