import styled from "styled-components";

const OverflowTable = styled.div`
  border-radius: 5px;
  margin-top: 30px;

  width: 100%;
  max-width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;

  th, td{
    padding: 15px 10px;
    text-align: left;
  }

  thead{
    background: #e1e1e1;
    color: #1b1b1b;
  }

  tbody{
    background: #ffffff;
  }
`;

function TablaGeneral({ data }) {
  if (!data || data.length === 0) {
    return 'No hay datos para mostrar';
  }

  const columnas = Object.keys(data[0]);

  return (
    <OverflowTable>
      <Table>
        <thead>
          <tr>
            {columnas.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((fila, i) => (
            <tr key={i}>
              {columnas.map((col, j) => (
                <td key={j}>{fila[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </OverflowTable>
  );
}

export default TablaGeneral;