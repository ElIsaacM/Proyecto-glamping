import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Inicio    from './interfaces/inicio/inicio';
import Paquetes  from './interfaces/Paquetes/paquetes';
import Productos from './interfaces/Productos/productos';
import Servicios from './interfaces/Servicios/servicios';
import Reservas  from './interfaces/Reservas/reservas';
import Cabanas   from './interfaces/Cabanas/cabanas';
import Usuarios  from './interfaces/Usuarios/usuarios';
import Pagos     from './interfaces/Pagos/pagos';
import Landing   from './interfaces/Landing/landing';

// ── Detectar subdominio ─────────────────────────────────────
// panel.glampinglosbosques.com  →  panel admin
// glampinglosbosques.com        →  landing clientes
// localhost / 127.0.0.1         →  panel admin (desarrollo)
const hostname = window.location.hostname;
const esPanel =
  hostname === 'panel.glampinglosbosques.com' ||
  hostname === 'localhost' ||
  hostname === '127.0.0.1';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {esPanel ? (
          /* ══════ panel.glampinglosbosques.com ══════ */
          <>
            <Route path='/'          element={<Inicio />} />
            <Route path='/cabanas'   element={<Cabanas />} />
            <Route path='/paquetes'  element={<Paquetes />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/servicios' element={<Servicios />} />
            <Route path='/reservas'  element={<Reservas />} />
            <Route path='/pagos'     element={<Pagos />} />
            <Route path='/usuarios'  element={<Usuarios />} />
          </>
        ) : (
          /* ══════ glampinglosbosques.com ══════ */
          <Route path='/' element={<Landing />} />
        )}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
