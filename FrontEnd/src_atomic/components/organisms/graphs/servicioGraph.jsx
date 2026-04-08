import PieGraph from "./PieGraph";

function ServicioGraph() {
  const data = [
    {
      titulo: 'Top 3 servicios',
      data: [
        { name: 'Jaccuzi', value: 8, income: 120 },
        { name: 'Piscina', value: 6, income: 90 },
        { name: 'Masaje', value: 4, income: 60 }
      ]
    },
  ];

  return(
    <PieGraph pieGraphData={ data }></PieGraph>
  );
}

export default ServicioGraph;