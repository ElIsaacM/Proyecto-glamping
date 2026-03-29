-------------------------- Views de clientes -----------------------------

CREATE INDEX idx_reservas_cliente ON reservas(clienteid);
CREATE INDEX idx_facturas_reserva ON facturas(reservaid);
CREATE INDEX idx_pagos_factura ON pagos(facturaid);
CREATE INDEX idx_clientes_nombre ON clientes(nombre)

CREATE VIEW vista_facturas_cliente AS
SELECT 
	f.*,
	c.nombre
FROM facturas f
JOIN reservas r ON r.reservaid = f.reservaid
JOIN clientes c ON c.clienteid = r.clienteid;

CREATE VIEW vista_pagos_cliente AS
SELECT 
	p.metodoid,
	mp.nombre AS metodo,
	p.facturaid,
	p.fechapago,
	p.estado,
	f.total,
	p.totalpagado,
	c.nombre
FROM pagos p
JOIN metodospago mp ON mp.metodoid = p.metodoid
JOIN facturas f ON f.facturaid = p.facturaid
JOIN reservas r ON r.reservaid = f.reservaid
JOIN clientes c ON c.clienteid = r.clienteid;

CREATE VIEW vista_reembolsos_cliente AS
SELECT 
	rm.pagoid,
	rm.fecha,
	rm.justificacion,
	rm.estado,
	f.total,
	rm.monto AS reembolsado,
	c.nombre
FROM reembolsos rm
JOIN pagos p ON p.pagoid = rm.pagoid
JOIN facturas f ON f.facturaid = p.facturaid
JOIN reservas r ON r.reservaid = f.reservaid
JOIN clientes c ON c.clienteid = r.clienteid;

SELECT * FROM vista_facturas_cliente

