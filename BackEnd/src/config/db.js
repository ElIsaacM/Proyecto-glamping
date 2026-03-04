import dotenv from 'dotenv';
dotenv.config();

<<<<<<< HEAD
import sql from 'mssql';
=======
import pg from 'pg';

const { Pool } = pg;
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
<<<<<<< HEAD
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

console.log('Config DB:', config);

export const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('SQL Server Conectado!')
  } catch(error) {
    console.error("Error Conectandose A Sql Server!");
    console.error(error.message);
    process.exit(1);
  }
}

export default sql 
=======
  host: process.env.DB_SERVER, // En Postgres se suele usar 'host' en lugar de 'server'
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 5432,
  // Para conexiones locales/desarrollo usualmente no necesitas SSL extra, 
  // pero si conectas a la nube (AWS/Azure), se configura aquí.
};

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
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)
