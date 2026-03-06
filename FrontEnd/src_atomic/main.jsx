import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Inicio from './pages/inicio/inicio';
import Paquetes from './pages/Paquetes/paquetes';
import Productos from './pages/Productos/productos';
import Servicios from './pages/Servicios/servicios';
import Reservas from './pages/Reservas/reservas';
import Cabanas from './pages/Cabanas/cabanas';
import Usuarios from './pages/Usuarios/usuarios';
import Pagos from './pages/Pagos/pagos';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/cabanas' element={<Cabanas />} />
        <Route path='/paquetes' element={<Paquetes />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/servicios' element={<Servicios />} />
        <Route path='/reservas' element={<Reservas />} />
        <Route path='/pagos' element={<Pagos />} />
        <Route path='/usuarios' element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
