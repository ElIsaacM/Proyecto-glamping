export const service = {
    getServices:`
        SELECT
            servicioid, nombre, encargado, duracionminutos, precio, descripcion, fechaactualizacion
        FROM servicios
        WHERE estado = 'Activo'
        ORDER BY servicioid
    `,
    getServiceById:`
        SELECT
            servicioid, nombre, encargado, duracionminutos, precio, descripcion, fechaactualizacion
        FROM servicios
        WHERE servicioid = $1
    `,
    createService:`
        INSERT INTO servicios (nombre, encargado, duracionminutos, precio, descripcion)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,
    updateService:`
        UPDATE servicios SET
            nombre = COALESCE(NULLIF($1, ''), nombre),
            encargado = COALESCE(NULLIF($2, ''), encargado),
            duracionminutos = COALESCE(NULLIF($3::text, '')::integer, duracionminutos),
            precio = COALESCE(NULLIF($4::text, '')::numeric, precio),
            descripcion = COALESCE(NULLIF($5, ''), descripcion),
            fechaactualizacion = CURRENT_DATE
        WHERE servicioid = $6
        RETURNING *
    `,
    deleteService:`
        UPDATE servicios
        SET estado = 'Inactivo'
        WHERE servicioid = $1
        RETURNING nombre
    `
}