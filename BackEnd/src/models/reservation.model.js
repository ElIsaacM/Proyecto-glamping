export const reservation = {
  getReservations: `
    SELECT
      *
    FROM vista_reservas
    ORDER BY id DESC
  `,
  getReservationByInvoice: `
    SELECT
      *
    FROM vista_reservas
    WHERE factura_id = $1
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
    WHERE reserva_id = $1
    RETURNING reserva_id
  `,
  activateReservation: `
    UPDATE reservas
    SET estado = 'Confirmado'
    WHERE reserva_id = $1
    RETURNING reserva_id
  `,
  cancelReservation: `
    UPDATE reservas
    SET estado = 'Cancelado'
    WHERE reserva_id = $1
    RETURNING reserva_id
  `
}

export const reservationFilters = {
  incomingReservations: `
    SELECT
      *
    FROM vista_reservas
    WHERE llegada = CURRENT_DATE
      AND estado <> 'Cancelado'
    ORDER BY fecha DESC
  `,
  paidReservations: `
    SELECT
      *
    FROM vista_reservas
    WHERE estado = 'Pagado'
    ORDER BY fecha DESC
  `,
  confirmedReservations: `
    SELECT
      *
    FROM vista_reservas
    WHERE estado = 'Confirmado'
    ORDER BY fecha DESC
  `,
  canceledReservations: `
    SELECT
      *
    FROM vista_reservas
    WHERE estado = 'Cancelado'
    ORDER BY fecha DESC
  `,
}

export const updateReservationByPayment = {
  updateTotal: `
    UPDATE reservas r
    SET por_pagar = f.total - sub.pagado
    FROM facturas f,
     (SELECT COALESCE(SUM(total_pagado), 0) AS pagado
      FROM pagos
      WHERE factura_id = $1
        AND estado != 'Cancelado') AS sub
    WHERE r.reserva_id = f.reserva_id
      AND r.reserva_id = $2;
  `,
  updateStatus: `
    UPDATE reservas
    SET estado = 'Pagado'
    WHERE por_pagar <= 0
      AND llegada > CURRENT_DATE
      AND estado <> 'Pagado'
      AND estado <> 'Cancelado'
`,
}

export const reservationStats = {
  getRevenueGraph: `
    SELECT 
      TO_CHAR(pg.fecha_pago, 'YYYY-MM') AS fecha,
      SUM(pg.total_pagado) AS total
    FROM pagos pg
    JOIN facturas f ON pg.factura_id = f.factura_id
    JOIN reservas r ON f.reserva_id = r.reserva_id
    WHERE r.estado <> 'Cancelada'
      AND pg.estado IN ('Completado', 'Agregado Manual')
      AND pg.fecha_pago >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months'
    GROUP BY TO_CHAR(pg.fecha_pago, 'YYYY-MM')
    ORDER BY fecha ASC;
  `
}

export const reservationDashboardStats = {
  totalReservations: `
    SELECT 
      COUNT(*) AS total_reservations
    FROM reservas
    WHERE estado IN ('Completado', 'Pagado')
      AND fecha_registro >= DATE_TRUNC('month', CURRENT_DATE)
  `,
  mostPopularPackage: `
    SELECT 
      p.nombre,
      COUNT(*) AS total
    FROM reservas r
    JOIN paquetes p ON r.paquete_id = p.paquete_id
    WHERE r.fecha_registro >= DATE_TRUNC('month', CURRENT_DATE)
    GROUP BY p.nombre
    ORDER BY total DESC
    LIMIT 1
  `,
  mostPopularDay: `
    SELECT 
      (ARRAY['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'])[EXTRACT(DOW FROM r.llegada) + 1] AS dia_semana,
      COUNT(*) AS total
    FROM reservas r
    WHERE r.estado IN ('Completado', 'Pagado')
      AND r.llegada >= DATE_TRUNC('month', CURRENT_DATE)
    GROUP BY 1
    ORDER BY total DESC
    LIMIT 1;
  `,
  getRevenueByMonth: `
    SELECT 
      saldo_neto_mes AS "Ingresos"
    FROM vista_pagos_stats
  `
}