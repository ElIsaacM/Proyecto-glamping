export const reservation = {
  getReservations: `
    SELECT
      *
    FROM vista_reservas
    ORDER BY fecha DESC
  `,
  getReservationByClient: `
    SELECT
      *
    FROM vista_reservas
    WHERE cliente ILIKE '%' || $1 || '%'
    ORDER BY fecha DESC
  `,
  createReservation: `
    -- Por resolver
    -- Insertar una factura por cada reserva
    -- Nota: agregar una obtencion de datos en el controller si el cliente 
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