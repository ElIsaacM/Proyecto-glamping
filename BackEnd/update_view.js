import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  try {
    await pool.query(`
      CREATE OR REPLACE VIEW vista_paquetes AS
      SELECT 
          p.paquete_id AS ID,
          tp.nombre AS Tipo,
          c.nombre AS "Cabaña",
          p.dias_estadia AS Dias,
          p.fecha_registro AS fecha,
          p.descripcion,
          p.estado,
          p.tipo_id,
          p.cabana_id
      FROM paquetes p
      JOIN tipo_paquete tp ON tp.tipo_id = p.tipo_id
      JOIN cabanas c ON c.cabana_id = p.cabana_id;
    `);
    console.log("View updated successfully");
  } catch(e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
main();
