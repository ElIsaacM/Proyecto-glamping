import pool from '../config/db.js';

export const getpayments = async () => {
    const result = await pool.query('SELECT * FROM Pagos');
    return result.rows;
};

export const getpaymentById = async (id) => {
    const result = await pool.query('SELECT * FROM Pagos WHERE PagoID = $1', [id]);
    return result.rows[0];
};
