import pool from '../config/db.js';

export const getservices = async () => {
    const result = await pool.query('SELECT * FROM Servicios');
    return result.rows;
};

export const getserviceById = async (id) => {
    const result = await pool.query('SELECT * FROM Servicios WHERE ServicioID = $1', [id]);
    return result.rows[0];
};
