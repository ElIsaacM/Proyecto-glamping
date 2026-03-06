import pool from '../config/db.js';

export const getreservations = async () => {
    const result = await pool.query('SELECT * FROM Reservas');
    return result.rows;
};

export const getreservationById = async (id) => {
    const result = await pool.query('SELECT * FROM Reservas WHERE ReservaID = $1', [id]);
    return result.rows[0];
};
