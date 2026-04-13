import styled from "styled-components";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from "../../../utils/formattersUtil";

const ContGraph = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 5px;

  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    margin: 0 0 15px 0;
    color: #333;
    align-self: flex-start;
  }

  @media (max-width: 500px) {
    height: 300px;
  }
`;

function LinearGraph({ data, xKey = 'fecha', yKey = 'total', title = "Ingresos a lo largo del tiempo", color = "#8884d8" }) {
  
  if (!data || data.length === 0) {
    return (
      <ContGraph>
        <h3>{title}</h3>
        <p style={{ color: '#888' }}>No hay suficientes datos para mostrar</p>
      </ContGraph>
    );
  }

  // RECHARTS NEEDS AT LEAST 2 POINTS TO DRAW AN AREA.
  // We prepend a fake point starting at 0 if there's only 1 point.
  const chartData = data.length === 1 
    ? [{ [xKey]: 'Inicio', [yKey]: 0 }, ...data] 
    : data;

  return (
    <ContGraph>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey={xKey} 
            tick={{ fontSize: 12, fill: '#666' }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#666' }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <Tooltip 
            formatter={(value) => [`${formatCurrency(value)}`, 'Ingresos']}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey={yKey} 
            stroke={color} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorUv)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </ContGraph>
  );
}

export default LinearGraph;