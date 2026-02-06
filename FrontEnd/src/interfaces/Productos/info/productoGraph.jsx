import PieGraph from "../../../components/graphs/PieGraph";

function ProductoGraph() {
  const data = [
    {
      titulo: 'Top 3 productos',
      img: '../../src/assets/Grafico.svg',
      top1: 'Coca cola',
      top2: 'Bandeja paisa',
      top3: 'Margarita',
    },
  ];

  return(
    <PieGraph pieGraphData={ data }></PieGraph>
  );
}

export default ProductoGraph;