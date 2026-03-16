import pool from '../config/db.js';

export const getpackages = async () => {
    const result = await pool.query('SELECT * FROM Paquetes');
    return result.rows;
};

export const getpackageById = async (id) => {
    const result = await pool.query('SELECT * FROM Paquetes WHERE PaqueteID = $1', [id]);
    return result.rows[0];
};

export const createPackage = async (packageData) => {
    const { tipoid, registradoporid, nombre, diasestadia, descripcion, estado } = packageData;
    const result = await pool.query(
        `INSERT INTO Paquetes (tipoid, registradoporid, nombre, diasestadia, descripcion, estado)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING nombre`,
        [tipoid, registradoporid, nombre, diasestadia, descripcion, estado]
    )

    return result.rows[0];
}

export const updatePackage = async (id, packageData) => {
    const { tipoid, registradoporid, nombre, diasestadia, descripcion } = packageData;
    const result = pool.query(`
        UPDATE Paquetes SET
            tipoid = COALESCE(NULLIF($1::text, '')::integer, tipoid),
            registradoporid = COALESCE(NULLIF($2::text, '')::integer, registradoporid),
            nombre = COALESCE(NULLIF($3, ''), nombre),
            diasestadia = COALESCE(NULLIF($4::text, '')::integer, diasestadia),
            descripcion = COALESCE(NULLIF($5, ''), descripcion)
        WHERE paqueteid = $6
        RETURNING *`,
        [tipoid, registradoporid, nombre, diasestadia, descripcion, id]
    )

    return result.rows[0];
}

export const deletePackage = async (id) => {
    const result = pool.query(`
        UPDATE Paquetes SET
            estado = 'Inactivo'
        WHERE paqueteid = $1
        RETURNING *`, [id]
    )

    return result.rows[0];
}