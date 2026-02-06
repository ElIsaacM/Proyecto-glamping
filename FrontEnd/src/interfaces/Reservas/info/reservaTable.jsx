import TablaGeneral from "../../../components/tabla";

function TablaReservas() {
    const data = [
        {
            cliente: 'Juan Perez',
            Paquete: 'Ocacional',
            Llegada: '30 / 02 / 2020',
            Salida: '30 / 05 / 2020',
            'Total a pagar': 240000,
            Factura: 'FA2553325',
        }
    ];

    return(
        <TablaGeneral data={ data }></TablaGeneral>
    );
}

export default TablaReservas;