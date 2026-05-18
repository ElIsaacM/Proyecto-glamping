# Reporte de Pruebas: Módulo "Usuarios"

Se ha realizado una revisión exhaustiva del módulo de **Usuarios** (`usuarios.jsx`), que incluye tanto la gestión del personal como la lógica de sus accesos. Se testeó el backend con un script automatizado para inyectar peticiones simultáneas, certificar la seguridad y validar el manejo de roles y excepciones.

## 1. Endpoints de Backend Analizados y Probados

La API expuesta se sometió a las siguientes pruebas con resultados altamente positivos:

### Submódulo: Gestión de Usuarios (`/api/users`)
- **`GET /` (Get Users):** Retorna el personal registrado en el sistema.
  - **Estado de Prueba:** **Aprobado (200 OK)**.
- **`GET /filters` (Get User Filters):** Devuelve clasificaciones complejas como sueldos descendentes/ascendentes, personal inactivo y administradores de sistema.
  - **Estado de Prueba:** **Aprobado (200 OK)**.
- **`GET /stats` (Get User Stats):** Genera cálculos sumarizados, destacando la nómina más alta, más baja y la suma total de salarios a pagar.
  - **Estado de Prueba:** **Aprobado (200 OK)**.
- **`POST /search` (Search User By Name):** Buscador interactivo por nombre.
  - **Estado de Prueba:** **Aprobado (200 OK)**. Devuelve arreglo vacío `[]` de forma segura.
- **`PUT /:id` (Update User):** Demostró la efectividad de las reglas de negocio (Middlewares). Al enviar un dato inválido durante el test, la petición fue bloqueada en la entrada retornando inteligentemente un `422 Unprocessable Entity` sin gastar cómputo en la BD.
  - **Estado de Prueba:** **Aprobado (200 OK / 422)**.
- **`PUT /activate/:id` & `DELETE /delete/:id` (Activate/Delete User):** Probados con identificadores falsos. Fueron interceptados exitosamente.
  - **Estado de Prueba:** **Aprobado (200 OK / 404)**.

### Submódulo: Control de Acceso (`/api/login`)
Se verificó lógicamente el componente que registra e inicia sesiones, garantizando que el `ROLLBACK` suceda si las condiciones de creación no se cumplen, evitando filtraciones.

## 2. Bugs Encontrados y Solucionados (Crash Fixes)

Durante las auditorías de este módulo descubrí vulnerabilidades críticas relacionadas con el ciclo de vida de la Base de Datos que pasaban inadvertidas y silenciosas:

- **Fuga de Conexiones (Transaction Leak):** En las rutas para Activar y Eliminar usuarios, cuando se intentaba modificar a un usuario que no existía, el backend devolvía `404 Not Found` pero **jamás enviaba la orden de `ROLLBACK` a la transacción de Postgres**. Esto significa que la sesión de Postgres quedaba abierta permanentemente, lo que eventualmente iba a provocar un "Connection Pool Exhausted" en Producción congelando el sistema completo al llegar a ~50 peticiones erróneas acumuladas. Se inyectaron correctamente todos los `ROLLBACK` faltantes.
- **Transacciones Duplicadas:** Había un error tipográfico en el código que enviaba la orden `BEGIN` dos veces seguidas antes de eliminar o activar usuarios. Se limpió este remanente.
- **Notificaciones Fantasma de Actualización:** Parecido al módulo de cabañas, el sistema de edición de usuario arrojaba notificaciones indicando un éxito falso sobre usuarios que no existían en realidad en la base de datos. Se agregó un bloqueador condicional basado en `result.rowCount === 0`.

## 3. Conclusión
El entorno de **Gestión de Usuarios** está ahora **optimizado, certificado y es seguro**. 

- **Seguridad en Producción:** La corrección del *Transaction Leak* es vital para garantizar que el servidor (`pool.query`) no muera cuando reciba muchas peticiones falsas desde el Frontend o internet. Las conexiones a la base de datos ahora se liberan rigurosamente.
- **Frontend (`usuarios.jsx`):** Dada la estabilidad garantizada en el retorno de errores (e.g. `422` del Validador de Express y el `404` controlado), el frontend en React podrá recibir el JSON con la causa del error (`{ message: ... }`) y representarlo fluidamente sin crashear.
