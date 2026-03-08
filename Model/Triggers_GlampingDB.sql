--------- Trigger que calcula el total a pagar
CREATE OR REPLACE FUNCTION fn_calcular_total_factura()
RETURNS TRIGGER AS $$
DECLARE
    v_paquete_id INT;
    v_dias INT;
    v_costo_cabanas DECIMAL(10,2) := 0;
    v_costo_servicios DECIMAL(10,2) := 0;
    v_costo_productos DECIMAL(10,2) := 0;
    v_subtotal_calculado DECIMAL(10,2) := 0;
BEGIN
    -- 1. Obtener el PaqueteID y los días de estadía desde la Reserva
    SELECT PaqueteID, (Salida - Llegada) INTO v_paquete_id, v_dias
    FROM Reservas WHERE ReservaID = NEW.ReservaID;

    -- Si la resta de fechas da 0 (mismo día), asumimos 1 noche mínimo
    IF v_dias = 0 THEN v_dias := 1; END IF;

    -- 2. Calcular costo de Cabañas (Precio Noche * Días)
    SELECT COALESCE(SUM(c.PrecioNoche * v_dias), 0) INTO v_costo_cabanas
    FROM CabanaPorPaquete cp
    JOIN Cabanas c ON cp.CabanaID = c.CabanaID
    WHERE cp.PaqueteID = v_paquete_id;

    -- 3. Calcular costo de Servicios (Precio * Cantidad de Personas)
    SELECT COALESCE(SUM(s.Precio * sp.CantidadPersonas), 0) INTO v_costo_servicios
    FROM ServiciosPorPaquete sp
    JOIN Servicios s ON sp.ServicioID = s.ServicioID
    WHERE sp.PaqueteID = v_paquete_id;

    -- 4. Calcular costo de Productos (Precio * Cantidad)
    SELECT COALESCE(SUM(p.PrecioVenta * pp.Cantidad), 0) INTO v_costo_productos
    FROM ProductosPorPaquete pp
    JOIN Productos p ON pp.ProductoID = p.ProductoID
    WHERE pp.PaqueteID = v_paquete_id;

    -- 5. Totales finales
    v_subtotal_calculado := v_costo_cabanas + v_costo_servicios + v_costo_productos;
    
    NEW.Subtotal := v_subtotal_calculado;
    -- El descuento se asume como porcentaje (ej: 10.00 para 10%)
    NEW.Total := v_subtotal_calculado - (v_subtotal_calculado * (COALESCE(NEW.Descuento, 0) / 100));

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ejecucion del trigger
CREATE TRIGGER trg_actualizar_total_factura
BEFORE INSERT ON Facturas
FOR EACH ROW
EXECUTE FUNCTION fn_calcular_total_factura();

--------- Trigger que calcula la fecha de salida en reservas
CREATE OR REPLACE FUNCTION fn_calcular_fecha_salida()
RETURNS TRIGGER AS $$
DECLARE
    v_dias_estadia INT;
BEGIN
    -- 1. Buscamos los DiasEstadia en la tabla Paquetes
    SELECT DiasEstadia INTO v_dias_estadia
    FROM Paquetes
    WHERE PaqueteID = NEW.PaqueteID;

    -- 2. Si por alguna razón no hay días definidos, ponemos 1 por defecto
    IF v_dias_estadia IS NULL THEN
        v_dias_estadia := 1;
    END IF;

    -- 3. Calculamos la fecha de salida: Llegada + días del paquete
    -- En Postgres: DATE + INTEGER = DATE
    NEW.Salida := NEW.Llegada + v_dias_estadia;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ejecucion
CREATE TRIGGER trg_definir_salida_reserva
BEFORE INSERT OR UPDATE OF Llegada, PaqueteID ON Reservas
FOR EACH ROW
EXECUTE FUNCTION fn_calcular_fecha_salida();