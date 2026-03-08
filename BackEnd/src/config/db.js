import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';

const { Pool } = pg;

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
}

console.log('Config DB:', { ...config, password: '****' }); // Tip: ocultar password en logs

// Creamos una instancia del Pool (maneja múltiples conexiones de forma eficiente)
const pool = new Pool(config);

export const connectDB = async () => {
  try {
    // Intentamos obtener un cliente para verificar la conexión
    const client = await pool.connect();
    console.log('PostgreSQL Conectado!');
    client.release(); // Importante liberar el cliente de prueba
  } catch (error) {
    console.error("Error Conectandose a PostgreSQL!");
    console.error(error.message);
    process.exit(1);
  }
};

export default pool;
