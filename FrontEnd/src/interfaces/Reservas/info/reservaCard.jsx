import SquareCard from "../../../components/cards/squareCard";

function ReservaCards() {
    const data = [
        {
            bgColor: '',
            texto: 'Total reservas',
            titulo: 500,
        },
        {
            bgColor: '',
            texto: 'Completas',
            titulo: 245,
        },
        {
            bgColor: '',
            texto: 'Ganancia del mes',
            titulo: '1.400M',
        },
        {
            bgColor: 'verde',
            texto: 'Ver pagos',
            titulo: '',
        },
    ]

    return(
        <SquareCard squareData={ data }></SquareCard>
    );
}

export default ReservaCards;