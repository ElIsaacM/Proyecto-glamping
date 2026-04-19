import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import Inicio from './pages/inicio/inicio';
import Paquetes from './pages/Paquetes/paquetes';
import Productos from './pages/Productos/productos';
import Servicios from './pages/Servicios/servicios';
import Reservas from './pages/Reservas/reservas';
import Cabanas from './pages/Cabanas/cabanas';
import Usuarios from './pages/Usuarios/usuarios';
import Pagos from './pages/Pagos/pagos';
import App from './app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
