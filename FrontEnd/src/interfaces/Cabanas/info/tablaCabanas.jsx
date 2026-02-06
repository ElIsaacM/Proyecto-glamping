import TablaGeneral from "../../../components/tabla";

function TablaCabanas() {
    const data = [
        {
            ID: 1,
            Nombre: 'Palmas',
            Estado: 'Activa',
            Descripcion: 'Descripcion',
            Precio: 240000,
        }
    ];

    return(
        <TablaGeneral data={ data }></TablaGeneral>
    );
}

export default TablaCabanas;