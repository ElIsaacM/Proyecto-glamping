export const refounds = {
  getRefounds: `
    SELECT
      * 
    FROM vista_reembolsos
    ORDER BY fecha DESC
  `,
}