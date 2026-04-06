import PieGraph from "./PieGraph";

function PaqueteGraph() {
  const data = [
    {
      titulo: 'Top 3 paquetes',
      data: [
        { name: 'Ocasional', value: 4, income: 100 },
        { name: 'Fin de semana', value: 3, income: 150 },
        { name: 'Premium', value: 1, income: 200 }
      ]
    },
  ];

  return(
    <PieGraph pieGraphData={ data }></PieGraph>
  );
}

export default PaqueteGraph;