export const packages = {
    getPackages: `
        SELECT
            paqueteid, tipoid, registradoporid, nombre, diasestadia, fecharegistro, descripcion
        FROM paquetes
        WHERE estado = 'Activo'
        ORDER BY paqueteid DESC
    `,
    getPackageById: `
        SELECT
            tipoid, registradoporid, nombre, diasestadia, fecharegistro, descripcion
        FROM paquetes
        WHERE paqueteid = $1
    `,
    createPackage: `
        INSERT INTO paquetes (tipoid, registradoporid, nombre, diasestadia, descripcion)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,
    updatePackage: `
        UPDATE paquetes SET
            tipoid = COALESCE(NULLIF($1::text, '')::integer, tipoid),
            registradoporid = COALESCE(NULLIF($2::text, '')::integer, registradoporid),
            nombre = COALESCE(NULLIF($3, ''), nombre),
            diasestadia = COALESCE(NULLIF($4::text, '')::integer, diasestadia),
            descripcion = COALESCE(NULLIF($5, ''), descripcion),
            fecharegistro = CURRENT_DATE
        WHERE paqueteid = $6
        RETURNING *
    `,
    deletePackage: `
        UPDATE paquetes SET
            estado = 'Inactivo'
        WHERE paqueteid = $1
        RETURNING nombre
    `
}