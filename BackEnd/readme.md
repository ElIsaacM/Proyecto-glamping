Estructura Típica de Archivos y Funciones

src: Contiene todo el código fuente principal.
No contiene archivos directamente; es un contenedor.

config: Almacena archivos de configuración.
Archivos: database.js, env.js, cors.js, auth.js o archivos .env.
Funciones: Configuración de conexión a bases de datos, variables de entorno, opciones de seguridad (CORS, JWT).

controllers: Contiene la lógica de manejo de solicitudes (request handlers).
Archivos: userController.js, productController.js, authController.js.
Funciones: Recibir datos de la ruta, llamar a los servicios correspondientes, y enviar la respuesta HTTP adecuada (res.status(200).json(...)). No deben contener lógica de negocio compleja ni consultas directas a la BD.

middleware: Almacena funciones que se ejecutan entre la solicitud del cliente y el controlador.
Archivos: authMiddleware.js, loggerMiddleware.js, errorMiddleware.js, validator.js.
Funciones: Verificación de tokens de autenticación, registro de solicitudes, manejo centralizado de errores, validación de datos de entrada.

models: Define la estructura de los datos e interactúa con la base de datos (si se usa un ORM/ODM).
Archivos: User.js, Product.js, Order.js.
Funciones: Definición de esquemas (con Mongoose o Sequelize), métodos de clase para consultas a la BD (ej. User.findByEmail()).

routes: Define los endpoints de la API y vincula las rutas a los controladores.
Archivos: userRoutes.js, productRoutes.js, authRoutes.js, api.js.
Funciones: Enrutamiento (app.get('/users', userController.getAllUsers)), aplicación de middleware a rutas específicas.

services: Contiene la lógica de negocio y operaciones complejas. (Esta es una buena práctica de "arquitectura hexagonal" o "capas").
Archivos: userService.js, productService.js, authService.js.
Funciones: Lógica para crear un usuario (incluyendo hashing de contraseñas), cálculo de precios, integración con servicios externos.

utils: Contiene funciones de utilidad reutilizables.
Archivos: helpers.js, mailer.js, constants.js, formatters.js.
Funciones: Funciones de ayuda genéricas, envío de correos electrónicos, constantes globales, formateo de fechas/monedas.