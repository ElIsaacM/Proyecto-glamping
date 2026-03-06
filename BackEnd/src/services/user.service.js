import pool from '../config/db.js';

export const getusers = async () => {
    const result = await pool.query('SELECT * FROM Usuarios');
    return result.rows;
};

export const getuserById = async (id) => {
    const result = await pool.query('SELECT * FROM Usuarios WHERE UsuarioID = $1', [id]);
    return result.rows[0];
};
