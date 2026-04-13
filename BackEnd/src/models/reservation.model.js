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
  updateReservationByPayment: `
    WITH calculo_saldos AS (
      SELECT 
          f.reserva_id,
          f.total - COALESCE(SUM(p.total_pagado), 0) AS nuevo_saldo
      FROM facturas f
      LEFT JOIN pagos p ON f.factura_id = p.factura_id AND p.estado = 'Completado'
      WHERE f.reserva_id = $1
      GROUP BY f.reserva_id, f.total
    )
    UPDATE reservas r
    SET por_pagar = cs.nuevo_saldo
    FROM calculo_saldos cs
    WHERE r.reserva_id = $1 
    AND r.reserva_id = cs.reserva_id;
  `,
  deleteReservation: `
    UPDATE reservas
    SET estado = 'Cancelado'
    WHERE reserva_id = $1
    RETURNING reserva_id
  `,
}