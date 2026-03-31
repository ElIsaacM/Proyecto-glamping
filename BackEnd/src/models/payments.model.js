export const payment = {
  getPayments: `
    SELECT
      mp.tipo,
      p.facturaid,
      p.fechapago,
      p.estado,
      f.total AS Total,
      p.totalpagado
    FROM pagos p
    JOIN facturas f ON p.facturaid = f.facturaid
    JOIN metodospago mp ON p.metodoid = mp.metodoid
    ORDER BY p.fechapago DESC
  `,
  getPaymentByDate: `
    SELECT
      mp.tipo,
      p.facturaid,
      p.fechapago,
      p.estado,
      f.total AS Total,
      p.totalpagado
    FROM pagos p
    JOIN facturas f ON p.facturaid = f.facturaid
    JOIN metodospago mp ON p.metodoid = mp.metodoid
    WHERE p.fechapago LIKE '%' || $1 || '%'
    ORDER BY p.fechapago DESC
  `,
  createPaymentManually: `
    INSERT INTO pagos (facturaid, fechapago, metodoid, estado, totalpagado)
    SELECT 
      f.facturaid,    
      CURRENT_DATE,   
      $2,             
      $3,             
      $4              
    FROM facturas f
    JOIN reservas r ON f.reservaid = r.reservaid
    JOIN clientes c ON r.clienteid = c.clienteid
    WHERE f.facturaid = $1 AND c.email = $5
    RETURNING facturaid, fechapago;
  `
}

// El estado debe dar 2 valores
// 1. aceptado
// 2. rechazado
// y es devuelto por la api de pagos

// facuraid no se ingresa manualmente, se obtiene de facturas

// Nota: ajustar para que el total mostrado en frontend
// sea la suma de todos los pagos por factura, con el fin 
// de que si un cliente paga 2 veces, el sistema muestre que pagó el total