export const packages = {
    getpackages: `
        SELECT * FROM Paquetes
    `,
    getpackageById: `
        SELECT * FROM Paquetes WHERE PaqueteID = $1
    `,
    createPackage: `
        INSERT INTO Paquetes (tipoid, registradoporid, nombre, diasestadia, descripcion, estado)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `,
    updatePackage: `
        UPDATE Paquetes SET
            tipoid = COALESCE(NULLIF($1::text, '')::integer, tipoid),
            registradoporid = COALESCE(NULLIF($2::text, '')::integer, registradoporid),
            nombre = COALESCE(NULLIF($3, ''), nombre),
            diasestadia = COALESCE(NULLIF($4::text, '')::integer, diasestadia),
            descripcion = COALESCE(NULLIF($5, ''), descripcion),
            estado = COALESCE(NULLIF($6, ''), estado)
        WHERE paqueteid = $7
        RETURNING *
    `,
    deletePackage: `
        UPDATE Paquetes SET
            estado = 'Inactivo'
        WHERE paqueteid = $1
        RETURNING *
    `
}