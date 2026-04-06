import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GraphsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const ContGraph = styled.div`
  width: 100%;
  min-width: 425px;
  height: 300px;
  border-radius: 5px;

  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>{data.name}</p>
        <p style={{ margin: "5px 0 0 0" }}>Reservas: {data.value}</p>
        {data.income !== undefined && (
          <p style={{ margin: "5px 0 0 0", color: "#333" }}>
            Ingresos: ${data.income}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  // Ubicamos la etiqueta a la mitad del grosor del arco
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Evitamos renderizar 0% para no amontonar
  if (percent === 0) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central" 
      fontSize={12} 
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieGraph({ pieGraphData }) {
  if (!pieGraphData || pieGraphData.length === 0) return null;

  return (
    <GraphsContainer>
      {pieGraphData.map((item, i) => {
        return (
          <ContGraph key={i}>
            <h3>{item.titulo}</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={item.data || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={50}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {(item.data || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
          </ContGraph>
        );
      })}
    </GraphsContainer>
  );
}

export default PieGraph;