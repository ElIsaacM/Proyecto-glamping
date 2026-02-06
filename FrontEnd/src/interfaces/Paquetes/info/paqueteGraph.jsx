import PieGraph from "../../../components/graphs/PieGraph";

function PaqueteGraph() {
  const data = [
    {
      titulo: 'Top 3 paquetes',
      img: '../../src/assets/Grafico.svg',
      top1: 'Ocasional',
      top2: 'Fin de semana',
      top3: 'Ocasional',
    },
  ];

  return(
    <PieGraph pieGraphData={ data }></PieGraph>
  );
}

export default PaqueteGraph;