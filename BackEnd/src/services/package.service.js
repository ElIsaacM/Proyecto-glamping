import pool from '../config/db.js';

export const getpackages = async () => {
    const result = await pool.query('SELECT * FROM Paquetes');
    return result.rows;
};

export const getpackageById = async (id) => {
    const result = await pool.query('SELECT * FROM Paquetes WHERE PaqueteID = $1', [id]);
    return result.rows[0];
};
