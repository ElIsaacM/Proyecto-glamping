# Reporte de Pruebas: Módulo "Inicio" (Dashboard)

Se ha realizado una revisión y prueba exhaustiva del módulo **Inicio** del sistema, evaluando tanto la integración de los componentes del frontend como el correcto funcionamiento de la API en el backend. 

## 1. Endpoints de Backend Analizados y Probados

Se ejecutó el servidor en un entorno de pruebas interactuando directamente con la base de datos PostgreSQL en Neon y consumiendo los endpoints protegidos vía JWT. Los resultados son los siguientes:

### `GET /api/dashboard`
- **Función:** Retorna las estadísticas generales utilizadas por las tarjetas informativas (`InicioCard.jsx`).
- **Consultas SQL ejecutadas:**
  - `totalReservations`: Cantidad total de reservas con estado 'Completado' o 'Pagado' del mes en curso.
  - `mostPopularPackage`: El paquete más reservado en el mes.
  - `mostPopularDay`: El día de la semana con mayor cantidad de reservas.
  - `getRevenueByMonth`: Consulta los ingresos netos desde la vista `vista_pagos_stats`.
- **Estado de Prueba:** **Aprobado (200 OK)**. El endpoint devuelve los datos correctamente estructurados en formato JSON.

### `GET /api/payments/stats`
- **Función:** Genera la información gráfica de los ingresos a través del tiempo, utilizada por `LinearGraph`.
- **Resultado:** Trae las sumatorias por fechas (`revenue_graph`) correctamente desde la tabla de pagos y facturas.
- **Estado de Prueba:** **Aprobado (200 OK)**. 

### `GET /api/notifications/last`
- **Función:** Obtiene las últimas 2 notificaciones del sistema para mostrarlas en la sección "Novedades".
- **Estado de Prueba:** **Aprobado (200 OK)**.

### `DELETE /api/notifications/:notificacion_id`
- **Función:** Elimina una notificación particular.
- **Estado de Prueba:** **Aprobado (200 OK)**. Se procesa el ID dinámicamente y la notificación se elimina correctamente de la base de datos.

## 2. Componentes Frontend Analizados

- **`inicio.jsx`:** El punto de entrada coordina exitosamente las llamadas con el hook `useFetch`. La estructura renderiza la cuadrícula de forma responsiva.
- **`inicioCard.jsx`:** Los datos provenientes de `/api/dashboard` se mapean correctamente a la interfaz de `RectangleCard`. Se incluye una verificación segura en `formattersUtil.js` para asegurar que, si la consulta de ingresos no obtiene datos (`undefined`), devuelva `"$ 0"` evitando crasheos de renderizado en React.
- **Gráfica (`LinearGraph`):** Se nutre sin inconvenientes del estado de `data?.revenue_graph`. 
- **Descarga de PDF (`downloadUtils.js`):** La exportación a PDF utilizando `html2canvas` y `jsPDF` está configurada correctamente y captura el contenido DOM.

## 3. Conclusión
El módulo **Inicio** está **completamente operativo y estable**. 

- **Integridad de datos:** Las consultas SQL asociadas están bien unificadas con `Promise.all()` en los controladores, optimizando el rendimiento.
- **Manejo de estados nulos:** El uso correcto del Optional Chaining (`?.`) en React previene errores de propiedades no definidas.
- **Comportamiento:** La carga y visualización de tarjetas, gráfica y mini-notificaciones trabajan de manera fluida y sin bloqueos.
