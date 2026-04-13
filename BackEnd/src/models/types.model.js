export const types = {
  getRoles: `
    SELECT 
      rol_id, 
      nombre 
    FROM roles
  `,
  getIdentificaciones: `
    SELECT 
      identificacion_id, 
      tipo 
    FROM identificaciones
  `,
}