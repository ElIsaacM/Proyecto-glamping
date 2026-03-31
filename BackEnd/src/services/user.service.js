import pool from '../config/db.js';

export const getusers = async () => {
    const result = await pool.query('SELECT * FROM Usuarios');

    if (result.rows.length === 0) {
    throw new Error("User not found!");
  }

    return result.rows;
};

export const getuserById = async (id) => {
    const result = await pool.query('SELECT * FROM Usuarios WHERE UsuarioID = $1', [id]);
    return result.rows[0];
};

export const createUser = async (userData) => {
    const { rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion } = userData;
    const result = await pool.query(
        `INSERT INTO Usuarios (rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING nombre`,
        [rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion]
    );

    return result.rows[0];
};

export const updateUser = async (id, userData) => {
    const { rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion } = userData;
    const result = await pool.query(
        `UPDATE Usuarios SET
            rolid = COALESCE(NULLIF($1::text, '')::integer, rolid),
            identificacionid = COALESCE(NULLIF($2::text, '')::integer, identificacionid),
            nombre = COALESCE(NULLIF($3, ''), nombre),
            contacto = COALESCE(NULLIF($4, ''), contacto),
            sueldo = COALESCE(NULLIF($5::text, '')::numeric, sueldo),
            numeroidentificacion = COALESCE(NULLIF($6, ''), numeroidentificacion)
        WHERE usuarioid = $7
        RETURNING *`,
        [rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion, id]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found!");
    }

    return result.rows[0];
};

export const deleteUser = async (id) => {
    const result = await pool.query(`
        DELETE FROM Usuarios WHERE usuarioid = $1`,
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found!");
    }

    return result.rows[0];
};