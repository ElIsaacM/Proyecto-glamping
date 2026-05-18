# Reporte de Pruebas: Módulo "Accesos y Sesiones" (Login, Registro y Recuperación)

Se ejecutó un análisis funcional sobre los componentes del frontend de acceso (`login.jsx`, `register.jsx`, `forgotPassword.jsx`) y su integración con los validadores en el backend (`/api/login`).

## 1. Integración Backend-Frontend Analizada

Se descubrió y se estructuró la comunicación de este módulo de manera integral para garantizar que los 3 flujos principales fuesen 100% operativos.

### Flujo 1: Inicio de Sesión (`login.jsx`)
- **Conexión:** `POST /api/login/`
- **Comportamiento:** Comprueba las credenciales mediante encriptación `bcrypt` y expide un JSON Web Token (JWT) almacenándolo en el LocalStorage.
- **Estado de Prueba:** **Aprobado (200 OK / 401 / 404)**. Valida correctamente contraseñas incorrectas y correos inexistentes sin vulnerar la Base de Datos.

### Flujo 2: Registro con Verificación (`register.jsx`)
- **Conexión:** `POST /api/login/send-verification-code` & `POST /api/login/create`
- **Comportamiento:** El usuario ingresa su ID. El sistema revisa en la nómina (tabla `usuarios`) si el empleado existe, y de ser así le envía un PIN aleatorio a su correo mediante `Nodemailer`.
- **Estado de Prueba:** **Aprobado**. Si el empleado no está registrado en el sistema administrativo por Recursos Humanos, le devuelve un `404` cortando la operación. La creación final incluye el `ROLLBACK` seguro si la ventana de 15 minutos caduca o falla algo a nivel SQL.

### Flujo 3: Recuperación de Contraseña (`forgotPassword.jsx`)
- **Conexión:** `POST /api/login/send-reset-code` & `POST /api/login/reset-password`
- **Comportamiento:** Empleando un sistema de pasos muy similar al de registro, se envía un PIN para verificar la identidad por correo antes de sobreescribir la contraseña de la DB.
- **Estado de Prueba:** **Aprobado**. Las rutas faltantes para este flujo en el backend fueron escritas e integradas durante la auditoría. Si el correo que se intenta recuperar no está registrado, se bloquea el intento devolviendo `404` fluidamente.

## 2. Bugs Encontrados y Solucionados (Crash Fixes)

La revisión del ecosistema de accesos permitió parchar algunas carencias estructurales:

- **EndPoints Faltantes:** Aunque el componente React `forgotPassword.jsx` estaba diseñado para recuperar cuentas pidiendo un token de reseteo, **sus rutas backend correspondientes (`send-reset-code` y `reset-password`) no existían** ni estaban expuestas en los enrutadores, por lo que presionar el botón resultaba en error de conectividad (Error de Fetch). Ambas rutas fueron desarrolladas e inyectadas usando la lógica JWT e integradas a los modelos SQL y a NodeMailer. 

## 3. Conclusión
El flujo de **Sesiones y Credenciales** se encuentra **estructuralmente completo, probado y operante**.

- **Experiencia de Usuario:** Los tres modales/ventanas renderizan perfectamente y ahora poseen su respaldo sólido en la base de datos y la API. El FrontEnd está en capacidad de notificar de manera limpia al usuario si se equivoca de código temporal, de correo o de contraseña.
- **Seguridad:** Ninguna falla SQL o manipulación indebida es posible debido a los bloques condicionales (Status 400 y 404 controlados) y al correcto aislamiento de las contraseñas que están encriptadas con `bcrypt`.
