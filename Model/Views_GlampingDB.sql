-------------------------- Views de facturas -----------------------------
CREATE OR REPLACE VIEW vista_facturas AS
SELECT 
	f.facturaid AS ID,
	f.reservaid AS Reserva,
	c.nombre AS Cliente,
	f.fechafactura AS fecha,
	f.subtotal,
	f.total,
	f.totalrestante AS "Por Pagar"
FROM facturas f
LEFT JOIN pagos p ON f.facturaid = p.facturaid
JOIN reservas r ON r.reservaid = f.reservaid
JOIN clientes c ON c.clienteid = r.clienteid
WHERE r.estado <> 'Cancelada';

SELECT * FROM facturas;

-------------------------- Views de pagos -----------------------------
CREATE VIEW vista_pagos AS
SELECT 
	p.pagoid AS ID,
	mp.nombre AS Metodo,
	p.facturaid AS Factura,
	p.fechapago AS Fecha,
	p.estado,
	p.totalpagado
FROM pagos p
JOIN metodospago mp ON mp.metodoid = p.metodoid;

SELECT * FROM Pagos

-------------------------- Views de reembolsos -----------------------------
CREATE VIEW vista_reembolsos_factura AS
SELECT 
    r.reembolsoid AS ID,
    r.pagoid AS Pago,
    p.facturaid AS Factura,
    r.fecha,
    r.justificacion,
    r.estado,
    (SELECT f.total * 0.9 FROM facturas f WHERE f.facturaid = p.facturaid) AS Reembolsado
FROM reembolsos r
JOIN pagos p ON p.pagoid = r.pagoid;

CREATE INDEX idx_reservas_cliente ON reservas(clienteid);
CREATE INDEX idx_facturas_reserva ON facturas(reservaid);
CREATE INDEX idx_pagos_factura ON pagos(facturaid);
CREATE INDEX idx_clientes_nombre ON clientes(nombre);

-------------------------- Views de reservas -----------------------------
CREATE VIEW vista_reservas AS
SELECT 
	r.reservaid AS ID,
	p.nombre AS Paquete,
	c.nombre AS Cliente,
	r.fecharegistro AS fecha,
	r.llegada,
	r.salida,
	r.estado
FROM Reservas r
JOIN Clientes c ON c.clienteid = r.clienteid
JOIN Paquetes p ON p.paqueteid = r.paqueteid

-------------------------- Views usuarios -----------------------------
CREATE VIEW vista_usuarios AS
SELECT 
	u.usuarioid AS ID,
	r.nombre AS Rol,
	i.tipo AS Identificacion,
	u.numeroidentificacion AS "# Identificacion",
	u.nombre AS Usuario,
	u.contacto AS Contacto,
	u.sueldo AS Sueldo,
	u.estado AS Estado
FROM usuarios u 
JOIN roles r ON u.rolid = r.rolid
JOIN identificaciones i ON i.identificacionid = u.identificacionid

-------------------------- Views servicios -----------------------------
CREATE VIEW vista_servicios AS
SELECT
	servicioID AS ID,
	nombre AS Servicio,
	encargado,
	duracionMinutos AS "Duracion en minutos",
	precio,
	descripcion, 
	fechaactualizacion AS Actualizacion,
	estado 
FROM Servicios

CREATE INDEX idx_servicios_activos_id ON servicios(servicioid) WHERE estado = 'Activo';

CREATE VIEW vista_servicios_stats AS
SELECT
    s.nombre AS servicio_nombre,
    COUNT(s.servicioid) AS veces_reservado,
    SUM(s.precio) AS ingresos_generados
FROM servicios s
JOIN serviciosPorPaquete spq ON s.servicioid = spq.servicioid
JOIN paquetes p ON spq.paqueteid = p.paqueteid
JOIN reservas r ON r.paqueteid = p.paqueteid
WHERE s.estado = 'Activo' 
  AND r.estado = 'Confirmada'
GROUP BY s.nombre, s.servicioid;

-------------------------- Views productos -----------------------------
CREATE VIEW vista_productos AS
SELECT
	productoid AS ID,
	nombre AS Producto,
	tipo,
	precioVenta AS Precio,
	descripcion,
	fechaActualizacion AS Actualizacion, 
	estado
FROM productos

CREATE INDEX idx_productos_activos_id ON productos(productoid) WHERE estado = 'Activo';

CREATE VIEW vista_productos_stats AS
SELECT
    p.nombre AS producto_nombre,
    COUNT(p.productoid) AS veces_reservado,
    SUM(p.precioventa) AS ingresos_generados
FROM productos p
JOIN productosPorPaquete ppq ON p.productoid = ppq.productoid
JOIN paquetes pq ON ppq.paqueteid = pq.paqueteid
JOIN reservas r ON r.paqueteid = pq.paqueteid
WHERE p.estado = 'Activo' 
  AND r.estado = 'Confirmada'
GROUP BY p.nombre, p.productoid;

SELECT * FROM productos

-------------------------- Views paquetes -----------------------------
CREATE VIEW vista_paquetes AS
SELECT 
	p.paqueteid AS ID,
	tp.nombre AS Tipo,
	u.nombre AS Registrador,
	p.nombre,
	p.diasEstadia AS Dias,
	p.fechaRegistro AS fecha,
	p.descripcion,
	p.estado
FROM paquetes p
JOIN tipopaquete tp ON tp.tipoid = p.tipoid
JOIN usuarios u ON u.usuarioid = p.registradoporid

SELECT * FROM paquetes


CREATE INDEX idx_reservas_estado_paquete ON reservas(estado, paqueteid);
CREATE INDEX idx_spq_relacion_servicios ON serviciosPorPaquete(paqueteid, servicioid);
CREATE INDEX idx_spq_relacion_productos ON productosPorPaquete(productoid, paqueteid);

-------------------------- Views cabañas -----------------------------


SELECT * FROM cabanas

-------------------------- Views paquetes -----------------------------
-------------------------- Views paquetes -----------------------------
-------------------------- Views paquetes -----------------------------
-------------------------- Views paquetes -----------------------------
-------------------------- Views paquetes -----------------------------


SELECT * FROM servicios





