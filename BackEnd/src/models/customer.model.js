export const customer = {
  getCustomerData: `
    SELECT 
      * 
    FROM vista_clientes
    WHERE identificacionid = $1
      AND identificacion = $2
      AND email = $3
  `,
  createCustomer: `
    INSERT INTO clientes (nombre, email, contacto, identificacion, paisresidencia)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING clienteid, nombre
  `
}