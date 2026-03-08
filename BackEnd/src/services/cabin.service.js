import pool from '../config/db.js';

export const getCabins = async () => {
    const result = await pool.query('SELECT * FROM Cabanas');

    if (result.rows.length === 0) {
        throw new Error('Cabins not found');
    }

    return result.rows;
};

export const getCabinById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM Cabanas WHERE CabanaID = $1',
        [id]
    );

    return result.rows[0];
};