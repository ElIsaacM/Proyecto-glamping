----------------- Tablas Base
-- Roles e Identificaciones
INSERT INTO Roles (Nombre) VALUES ('Administrador'), ('Recepcionista'), ('Mantenimiento'), ('Mesero'), ('Guía');
INSERT INTO Identificaciones (Tipo) VALUES ('Cédula de Ciudadanía'), ('Pasaporte'), ('Cédula de Extranjería');

-- Servicios y Productos
INSERT INTO Servicios (Nombre, Encargado, DuracionMinutos, Precio) VALUES 
('Masaje Relajante', 'Ana Pérez', 60, 50.00),
('Cena Romántica', 'Chef Juan', 120, 80.00),
('Tour Bosque', 'Guía Carlos', 180, 30.00),
('Desayuno Especial', 'Cocina', 45, 15.00),
('Jacuzzi Privado', 'Limpieza', 90, 40.00);

INSERT INTO Productos (Nombre, Tipo, Stock, PrecioVenta) VALUES 
('Vino Tinto', 'Bebida', 20, 25.00),
('Cerveza Artesanal', 'Bebida', 50, 5.00),
('Kit Fogata', 'Varios', 15, 12.00),
('Snack Box', 'Comida', 30, 10.00),
('Botella Agua', 'Bebida', 100, 2.00);

-- Cabañas y Tipos de Paquete
INSERT INTO Cabanas (Nombre, PrecioNoche) VALUES 
('Nido del Águila', 150.00), ('Refugio Verde', 120.00), ('Vista Azul', 200.00), ('Cueva Calma', 110.00), ('Pino Real', 180.00);
INSERT INTO TipoPaquete (Nombre) VALUES ('Básico'), ('Premium'), ('Aniversario'), ('Aventura'), ('Relajación');

-- Métodos de Pago
INSERT INTO MetodosPago (Tipo, Nombre) VALUES ('Efectivo', 'Pago en recepción'), ('Tarjeta', 'Visa/Mastercard'), ('Transferencia', 'Nequi/Daviplata');

----------------- Usuarios, Clientes y Paquetes
-- Usuarios (Para el campo RegistradoPorID)
INSERT INTO Usuarios (RolID, IdentificacionID, Nombre, Contacto, Sueldo, NumeroIdentificacion) VALUES 
(1, 1, 'Admin Principal', 'admin@glamping.com', 2500.00, '12345678'),
(2, 1, 'Laura Recepción', 'laura@glamping.com', 1200.00, '87654321');

-- Clientes
INSERT INTO Clientes (Nombre, Email, Contacto, Identificacion, PaisResidencia) VALUES 
('Carlos Ruiz', 'carlos@mail.com', '300111', '1010', 'Colombia'),
('Maria Lopez', 'maria@mail.com', '300222', '2020', 'México'),
('John Doe', 'john@mail.com', '300333', '3030', 'USA');

-- Paquetes (Aquí definimos los días para el trigger de fecha)
INSERT INTO Paquetes (TipoID, RegistradoPorID, Nombre, DiasEstadia, Estado) VALUES 
(1, 1, 'Escapada Express', 1, 'Activo'),
(2, 1, 'Fin de Semana Largo', 3, 'Activo'),
(3, 2, 'Luna de Miel', 2, 'Activo');

----------------- Intermedias
-- Cabañas asignadas a paquetes
INSERT INTO CabanaPorPaquete (PaqueteID, CabanaID) VALUES (1, 1), (2, 2), (3, 3);

-- Servicios y Productos asignados a paquetes
INSERT INTO ServiciosPorPaquete (PaqueteID, ServicioID, CantidadPersonas) VALUES (1, 4, 2), (2, 3, 2), (3, 1, 2), (3, 2, 2);
INSERT INTO ProductosPorPaquete (PaqueteID, ProductoID, Cantidad) VALUES (1, 5, 2), (2, 2, 6), (3, 1, 1), (3, 3, 1);


----------------- Reservas y facturas
-- Al insertar la Reserva, el trigger calculará la 'Salida' basándose en 'Llegada' + 'DiasEstadia' del paquete.
INSERT INTO Reservas (PaqueteID, ClienteID, Llegada, Estado) VALUES 
(1, 1, '2026-03-10', 'Confirmada'),
(2, 2, '2026-04-15', 'Confirmada'),
(3, 3, '2026-05-20', 'Confirmada');

-- Al insertar la Factura, el trigger sumará todo lo del paquete y aplicará el descuento al Subtotal.
INSERT INTO Facturas (ReservaID, Descuento) VALUES 
(1, 0.00),  -- Sin descuento
(2, 10.00), -- 10% de descuento
(3, 15.00); -- 15% de descuento

----------------- Prueba
SELECT 
    f.FacturaID, 
    r.Llegada, 
    r.Salida as "Salida Calculada", 
    f.Subtotal as "Suma Paquete", 
    f.Descuento as "% Desc", 
    f.Total as "Total Final"
FROM Facturas f
JOIN Reservas r ON f.ReservaID = r.ReservaID;
----------------- Tablas Base