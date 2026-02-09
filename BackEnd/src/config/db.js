import dotenv from 'dotenv';
dotenv.config();

import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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