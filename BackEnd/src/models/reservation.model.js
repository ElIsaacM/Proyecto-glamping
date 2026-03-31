export const reservation = {
  getReservations: `
    SELECT
      *
    FROM vista_facturas_cliente
    ORDER BY fechafactura DESC
  `,
  getReservationByClient: `
    SELECT
      *
    FROM vista_facturas_cliente
    WHERE cliente ILIKE '%' || $1 || '%'
    ORDER BY fechafactura DESC
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