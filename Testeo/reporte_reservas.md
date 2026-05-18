# Reporte de Pruebas: Módulo "Reservas"

Se ha realizado una revisión y prueba exhaustiva del módulo **Reservas** del sistema. A diferencia del inicio, el testeo de este módulo se ejecutó a nivel lógico implementando un script automatizado para enviar peticiones en cascada contra todos los endpoints y forzar todos los escenarios de respuesta.

## 1. Endpoints de Backend Analizados y Probados

Se ejecutó el servidor en un entorno de pruebas interactuando con la base de datos PostgreSQL en Neon y consumiendo los endpoints. Los resultados finales tras las reparaciones son:

### `GET /api/reservations/`
- **Función:** Obtiene el listado general de todas las reservas registradas consultando la `vista_reservas`.
- **Estado de Prueba:** **Aprobado (200 OK)**. El endpoint devuelve el arreglo completo.

### `GET /api/reservations/filters`
- **Función:** Genera arreglos categorizados por estados (entrantes hoy, pagadas, confirmadas, canceladas) para agilizar los filtros en la interfaz.
- **Estado de Prueba:** **Aprobado (200 OK)**. 

### `POST /api/reservations/search`
- **Función:** Busca reservas asociadas a un ID de factura específico.
- **Estado de Prueba:** **Aprobado (200 OK / 404)**. Validado para retornar `404 Not Found` en caso de no existir la factura, evitando excepciones en el motor.

### `POST /api/reservations/lock/:id`
- **Función:** Bloquea fechas temporalmente verificando primero la disponibilidad del paquete y la cabaña asociada.
- **Estado de Prueba:** **Aprobado (200 OK / 400 / 404)**. Funciona correctamente tras resolver un crash por lecturas indefinidas.

### `DELETE /api/reservations/unlock/:lockId`
- **Función:** Libera las fechas bloqueadas por una reserva temporal.
- **Estado de Prueba:** **Aprobado (200 OK)**. 

### `PUT /api/reservations/update/:id`
- **Función:** Actualiza las fechas de llegada y salida, elimina el bloqueo temporal y genera una notificación global.
- **Estado de Prueba:** **Aprobado (200 OK)**. 

### `PUT /api/reservations/activate/:id`
- **Función:** Activa y confirma una reserva, además de anular automáticamente cualquier reembolso pendiente si el cliente decide retomarla.
- **Estado de Prueba:** **Aprobado (200 OK / 404)**. 

### `PUT /api/reservations/delete/:id`
- **Función:** Cancela la reserva, evalúa la deuda contra el total pagado y, si el cliente tiene saldo a favor, genera un registro de reembolso automáticamente.
- **Estado de Prueba:** **Aprobado (200 OK / 404)**.


## 2. Bugs Encontrados y Solucionados (Crash Fixes)

Durante la fase de automatización de pruebas, el script detectó que el Backend sufría caídas fatales (Error 500) en varios métodos debido a problemas de referencias e importaciones:

- **Caída en Bloqueo de Fechas:** Lanzaba un `TypeError: Cannot read properties of undefined` al intentar leer un id cuando el paquete o la reserva base no existía. Se protegió con una condición de retorno 404.
- **Caída en Activación (`activateReservation`):** Invocaba el objeto `reservationModels` que no estaba importado ni definido, provocando un fallo total en la API. Se corrigió a la sintaxis real (`reservation.activateReservation`).
- **Caídas lógicas en Cancelación (`cancelReservation`):** 
  - Empleaba funciones y modelos inexistentes (`invoiceModels`, `reservationModels`).
  - Tenía un error de lógica de negocio buscando por `factura_id` pasándole el parámetro `reserva_id`. Se solventó creando la nueva función SQL `getReservationById` en el modelo.
  - La vista `vista_facturas` se invocaba buscando una columna `reserva_id` cuando la columna original se llamaba simplemente `reserva`. 

## 3. Conclusión
El módulo **Reservas** está **completamente operativo y blindado**. 

- **Integridad de datos:** Las sentencias de reembolso, activación, bloqueo y actualización están conectadas y unificadas en transacciones (`BEGIN` / `COMMIT` / `ROLLBACK`).
- **Control de Excepciones:** Se reemplazaron todas las ventanas de vulnerabilidad que provocaban "Crash" del servidor por respuestas JSON controladas de status `404 Not Found`.
- **Estabilidad de la API:** Tras someter a la API a un testeo completo de operaciones cruzadas, el servidor se mantiene estable, lo cual es vital para el paso a Producción.
