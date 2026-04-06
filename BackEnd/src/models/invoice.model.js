export const invoice = {
  getInvoices: `
    SELECT
      * 
    FROM vista_facturas
    ORDER BY fecha DESC
  `,
  getInvoicesByID: `
    SELECT
      * 
    FROM vista_facturas
    WHERE id ILIKE '%' || $1 || '%'
  `,
  createInvoice: `
    INSERT INTO facturas (reservaid, fechafactura, subtotal, descuento, total, totalrestante)
    SELECT 
      r.reservaid,    
      CURRENT_DATE,   
      $1,             
      $2,             
      $1 * (1 - $2 / 100.0),             
      $1 * (1 - $2 / 100.0)           
    FROM reservas r
    JOIN clientes c ON r.clienteid = c.clienteid
    WHERE r.reservaid = $4 AND c.email = $5
    RETURNING facturaid, fechafactura, total;
  `,
  updateInvoiceByPayment: `
    UPDATE facturas f
    SET totalrestante = f.total - COALESCE(pago_total, 0)
    FROM (
	    SELECT
		    facturaid,
		    SUM(totalpagado) AS pago_total
	    FROM pagos
	    GROUP BY facturaid
    ) AS p
    WHERE f.facturaid = p.facturaid
  `
}