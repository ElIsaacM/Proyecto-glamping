import PieGraph from "./PieGraph";

function ProductoGraph() {
  const data = [
    {
      titulo: 'Top 3 productos',
      data: [
        { name: 'Coca cola', value: 10, income: 30 },
        { name: 'Bandeja paisa', value: 5, income: 75 },
        { name: 'Margarita', value: 2, income: 20 }
      ]
    },
  ];

  return(
    <PieGraph pieGraphData={ data }></PieGraph>
  );
}

export default ProductoGraph;