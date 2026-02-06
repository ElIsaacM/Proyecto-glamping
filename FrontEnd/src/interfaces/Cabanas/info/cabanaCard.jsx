import SquareCard from "../../../components/cards/squareCard"; 

function CabanaCard() {
    const data = [
        {
            bgColor: '',
            texto: 'Total reservas',
            titulo: 245,
        },
        {
            bgColor: '',
            texto: 'Total reservas',
            titulo: 245,
        },
        {
            bgColor: '',
            texto: 'Total reservas',
            titulo: 245,
        },
        {
            bgColor: 'verde',
            texto: 'Agregar paquete',
            titulo: '',
        },
    ]

    return(
        <SquareCard squareData={ data }></SquareCard>
    );
}

export default CabanaCard;