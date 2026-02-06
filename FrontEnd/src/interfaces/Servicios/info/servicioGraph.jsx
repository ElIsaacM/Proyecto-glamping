import PieGraph from "../../../components/graphs/PieGraph";

function ServicioGraph() {
  const data = [
    {
      titulo: 'Top 3 servicios',
      img: '../../src/assets/Grafico.svg',
      top1: 'Jaccuzi',
      top2: 'Piscina',
      top3: 'Masaje',
    },
  ];

  return(
    <PieGraph pieGraphData={ data }></PieGraph>
  );
}

export default ServicioGraph;