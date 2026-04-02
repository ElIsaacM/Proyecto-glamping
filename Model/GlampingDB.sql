-- 1. CREACIÓN DE TABLAS BASE (Sin dependencias circulares)

CREATE TABLE Servicios (
    ServicioID SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Encargado VARCHAR(100),
    DuracionMinutos INT NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Descripcion TEXT DEFAULT 'Sin descripcion',
    FechaActualizacion DATE DEFAULT CURRENT_DATE,
	Estado VARCHAR(50) DEFAULT 'Activo' 
);

CREATE TABLE Productos (
    ProductoID SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Tipo VARCHAR(100) NOT NULL,
    Stock INT NOT NULL,
    PrecioVenta DECIMAL(10,2) NOT NULL,
    Descripcion TEXT DEFAULT 'Sin descripcion',
    FechaActualizacion DATE DEFAULT CURRENT_DATE,
	Estado VARCHAR(50) DEFAULT 'Activo'
);

CREATE TABLE Cabanas (
    CabanaID SERIAL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    PrecioNoche DECIMAL(10,2) NOT NULL,
    FechaRegistro DATE DEFAULT CURRENT_DATE,
    Descripcion TEXT DEFAULT 'Sin descripcion',
    FechaMantenimiento DATE,
    Estado VARCHAR(50) DEFAULT 'Activo'
);

CREATE TABLE DanosMantenimientos (
    DanoID SERIAL PRIMARY KEY,
    CabanaID INT NOT NULL,
    Descripcion TEXT DEFAULT 'Sin descripcion',
    Estado VARCHAR(100),
    FechaRegistro DATE DEFAULT CURRENT_DATE NOT NULL,
    FechaArreglo DATE,
    Responsable VARCHAR(100)
);

CREATE TABLE TipoPaquete (
    TipoID SERIAL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

-- 2. TABLAS DE USUARIOS Y ACCESO

CREATE TABLE Roles (
    RolID SERIAL PRIMARY KEY,
    Nombre VARCHAR(50) DEFAULT 'Empleado'
);

CREATE TABLE Identificaciones (
    IdentificacionID SERIAL PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL
);

CREATE TABLE Usuarios (
    UsuarioID SERIAL PRIMARY KEY,
    RolID INT NOT NULL,
    IdentificacionID INT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Contacto VARCHAR(100) UNIQUE, -- Espacio para encriptación
    Sueldo DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    NumeroIdentificacion VARCHAR(100) UNIQUE NOT NULL, -- VARCHAR para hashes/encriptación
    Estado VARCHAR(50) DEFAULT 'Activo'
);

CREATE TABLE Login (
    LoginID SERIAL PRIMARY KEY,
    UsuarioID INT,
    Email VARCHAR(250) NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
	Estado VARCHAR(50) DEFAULT 'Activo'
);

CREATE TABLE LogsAcciones (
    LogID SERIAL PRIMARY KEY,
    LoginID INT,
    Accion VARCHAR(50),
    FechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Detalles TEXT
);

-- 3. PAQUETES Y RELACIONES (Precios removidos para cálculo dinámico)

CREATE TABLE Paquetes (
    PaqueteID SERIAL PRIMARY KEY,
    TipoID INT NOT NULL,
    RegistradoPorID INT,
    Nombre VARCHAR(50) NOT NULL DEFAULT 'Personalizado',
    DiasEstadia INT DEFAULT 1,
    FechaRegistro DATE DEFAULT CURRENT_DATE,
    Descripcion TEXT DEFAULT 'Sin descripcion',
    Estado VARCHAR(50) DEFAULT 'Activo'
);

CREATE TABLE ServiciosPorPaquete (
    ServicioPaqueteID SERIAL PRIMARY KEY,
    PaqueteID INT NOT NULL,
    ServicioID INT NOT NULL,
    CantidadPersonas INT DEFAULT 1
);

CREATE TABLE ProductosPorPaquete (
    ProductoPaqueteID SERIAL PRIMARY KEY,
    PaqueteID INT NOT NULL,
    ProductoID INT NOT NULL,
    Cantidad INT DEFAULT 1
);

CREATE TABLE CabanaPorPaquete (
    CabanaPaqueteID SERIAL PRIMARY KEY,
    PaqueteID INT NOT NULL,
    CabanaID INT NOT NULL
);

-- 4. CLIENTES, RESERVAS Y PAGOS

CREATE TABLE Clientes (
    ClienteID SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Contacto VARCHAR(100) NOT NULL,
    Identificacion VARCHAR(255) NOT NULL,
    PaisResidencia VARCHAR(100) NOT NULL
);

CREATE TABLE Reservas (
    ReservaID SERIAL PRIMARY KEY,
    PaqueteID INT NOT NULL,
    ClienteID INT NOT NULL,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Llegada DATE NOT NULL,
    Salida DATE NOT NULL,
    Estado VARCHAR(50) DEFAULT 'Activo'
);

CREATE TABLE Facturas (
    FacturaID SERIAL PRIMARY KEY,
    ReservaID INT NOT NULL,
    FechaFactura DATE DEFAULT CURRENT_DATE,
    Subtotal DECIMAL(10,2),
    Descuento DECIMAL(5,2) DEFAULT 0.00, -- Porcentaje (ej: 0.10 para 10%)
	Total NUMERIC GENERATED ALWAYS AS (
		ROUND(Subtotal * (1 - Descuento / 100), 2)
	) STORED
);

CREATE TABLE MetodosPago (
    MetodoID SERIAL PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL,
    Nombre TEXT DEFAULT 'Sin descripcion'
);

CREATE TABLE Pagos (
    PagoID SERIAL PRIMARY KEY,
    MetodoID INT NOT NULL,
    FacturaID INT NOT NULL,
    FechaPago DATE DEFAULT CURRENT_DATE NOT NULL,
    Estado VARCHAR(50),
    TotalPagado DECIMAL(10,2)
);

CREATE TABLE Reembolsos (
    ReembolsoID SERIAL PRIMARY KEY,
    PagoID INT NOT NULL,
    Fecha DATE DEFAULT CURRENT_DATE NOT NULL,
    Justificacion TEXT NOT NULL,
    Estado VARCHAR(50) NOT NULL,
    Monto DECIMAL(10,2) NOT NULL
);

-------------------------- FOREIGN KEYS -----------------------------

ALTER TABLE ServiciosPorPaquete 
    ADD CONSTRAINT fk_Servicio_Paquete FOREIGN KEY (PaqueteID) REFERENCES Paquetes(PaqueteID) ON UPDATE CASCADE,
    ADD CONSTRAINT fk_Servicio_Servicios FOREIGN KEY (ServicioID) REFERENCES Servicios(ServicioID) ON UPDATE CASCADE;

ALTER TABLE ProductosPorPaquete 
    ADD CONSTRAINT fk_Producto_Paquete FOREIGN KEY (PaqueteID) REFERENCES Paquetes(PaqueteID) ON UPDATE CASCADE,
    ADD CONSTRAINT fk_Producto_Productos FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID) ON UPDATE CASCADE;

ALTER TABLE DanosMantenimientos ADD CONSTRAINT fk_Dano_Cabanas FOREIGN KEY (CabanaID) REFERENCES Cabanas(CabanaID);
ALTER TABLE Usuarios ADD CONSTRAINT fk_Usuarios_Roles FOREIGN KEY (RolID) REFERENCES Roles(RolID);
ALTER TABLE Usuarios ADD CONSTRAINT fk_Usuarios_Identificacion FOREIGN KEY (IdentificacionID) REFERENCES Identificaciones(IdentificacionID);
ALTER TABLE Login ADD CONSTRAINT fk_Cuenta_Usuarios FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID) ON DELETE CASCADE;
ALTER TABLE LogsAcciones ADD CONSTRAINT fk_Logs_Cuenta FOREIGN KEY (LoginID) REFERENCES Login(LoginID);

ALTER TABLE Paquetes 
    ADD CONSTRAINT fk_Paquete_Tipo FOREIGN KEY (TipoID) REFERENCES TipoPaquete(TipoID),
    ADD CONSTRAINT fk_Paquete_Usuario FOREIGN KEY (RegistradoPorID) REFERENCES Usuarios(UsuarioID);

ALTER TABLE CabanaPorPaquete 
    ADD CONSTRAINT fk_Cabana_Paquete FOREIGN KEY (PaqueteID) REFERENCES Paquetes(PaqueteID),
    ADD CONSTRAINT fk_Cabana_Cabana FOREIGN KEY (CabanaID) REFERENCES Cabanas(CabanaID);

ALTER TABLE Reservas 
    ADD CONSTRAINT fk_Reservas_Paquetes FOREIGN KEY (PaqueteID) REFERENCES Paquetes(PaqueteID),
    ADD CONSTRAINT fk_Reservas_Cliente FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID) ON DELETE CASCADE;

ALTER TABLE Facturas ADD CONSTRAINT fk_Facturas_Reservas FOREIGN KEY (ReservaID) REFERENCES Reservas(ReservaID) ON UPDATE CASCADE;
ALTER TABLE Pagos 
    ADD CONSTRAINT fk_Pagos_Facturas FOREIGN KEY (FacturaID) REFERENCES Facturas(FacturaID) ON UPDATE CASCADE,
    ADD CONSTRAINT fk_Pagos_Metodos FOREIGN KEY (MetodoID) REFERENCES MetodosPago(MetodoID);

ALTER TABLE Reembolsos ADD CONSTRAINT fk_Reembosos_Pagos FOREIGN KEY (PagoID) REFERENCES Pagos(PagoID);