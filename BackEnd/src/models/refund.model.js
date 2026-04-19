export const refunds = {
  getRefunds: `
    SELECT
      * 
    FROM vista_reembolsos
    ORDER BY fecha DESC
  `,
}