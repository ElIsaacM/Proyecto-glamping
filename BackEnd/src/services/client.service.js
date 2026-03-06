import pool from '../config/db.js';

export const getclients = async () => {
    const result = await pool.query('SELECT * FROM Clientes');
    return result.rows;
};

export const getclientById = async (id) => {
    const result = await pool.query('SELECT * FROM Clientes WHERE ClienteID = $1', [id]);
    return result.rows[0];
};
