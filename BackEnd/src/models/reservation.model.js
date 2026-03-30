export const reservation = {
  getReservations: `
    SELECT
      p.nombre AS paquete,
      c.nombre AS cliente,
      r.llegada,
      r.salida,
      r.estado,
      f.total
    FROM reservas r
    JOIN paquetes p ON r.paqueteid = p.paqueteid
    JOIN clientes c ON r.clienteid = c.clienteid
    JOIN facturas f ON r.reservaid = f.reservaid
    ORDER BY r.llegada DESC
  `,
  getReservationByClient: `
      SELECT
      p.nombre AS paquete,
      c.nombre AS cliente,
      r.llegada,
      r.salida,
      r.estado,
      f.total
    FROM reservas r
    JOIN paquetes p ON r.paqueteid = p.paqueteid
    JOIN clientes c ON r.clienteid = c.clienteid
    JOIN facturas f ON r.reservaid = f.reservaid
    WHERE c.nombre ILIKE '%' || $1 || '%'
    ORDER BY r.llegada DESC
  `,
  createReservation: `
    -- Por resolver
    -- Nota: agregar una obtencion de datos si el cliente 
    -- ingresa correctamente la cc y el correo, de este modo no tendría que ingresar de nuevo sus datos
  `,
  updateReservation: `
    -- Por resolver, se debe evitar duplicados en fecha 
  `,
  deleteReservation: `
    UPDATE reservas
    SET estado = 'Cancelado'
    WHERE reservaid = $1
    RETURNING reservaid
  `,
}