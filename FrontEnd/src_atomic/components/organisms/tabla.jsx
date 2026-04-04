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
    max-width: 200px;
    overflow: hidden;
    text-overflow: wrap;
    white-space: wrap;
  }

  thead{
    background: #e1e1e1;
    color: #1b1b1b;
  }

  tbody{
    background: #ffffff;
  }

  td.acciones {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  button.accion-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

function TablaGeneral({ data, acciones, onEdit, onDelete, onActive, hideActions }) {
  if (!data || data.length === 0) {
    return <p>No hay datos para mostrar</p>;
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
            {(!hideActions && (acciones || onEdit || onDelete || onActive)) && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((fila, i) => (
            <tr key={i}>
              {columnas.map((col, j) => (
                <td key={j}>{fila[col] === null ? 'N / A' : fila[col]}</td>
              ))}
              {(!hideActions && (acciones || onEdit || onDelete || onActive)) && (
                <td className="acciones">
                  {onEdit && (
                    <button
                      className="accion-btn"
                      onClick={() => onEdit(fila)}
                      title="Editar"
                      style={{ color: "#FFC107" }}
                    >
                      <i className="bi bi-pencil-fill" style={{ fontSize: '1.2rem' }}></i>
                    </button>
                  )}
                  {(onDelete && fila.estado !== 'Inactivo') && (
                    <button
                      className="accion-btn"
                      onClick={() => onDelete(fila)}
                      title="Eliminar"
                      style={{ color: "#DC3545" }}
                    >
                      <i className="bi bi-bag-dash-fill" style={{ fontSize: '1.2rem' }}></i>
                    </button>
                  )}
                  {(onActive && fila.estado === 'Inactivo') && (
                    <button
                      className="accion-btn"
                      onClick={() => onActive(fila)}
                      title="Activar"
                      style={{ color: "#28a745" }}
                    >
                      <i className="bi bi-bag-plus-fill" style={{ fontSize: '1.2rem' }}></i>
                    </button>
                  )}
                  {acciones && acciones.map((accion, k) => (
                    <button
                      key={k}
                      className="accion-btn"
                      onClick={() => accion.onClick(fila)}
                      title={accion.title}
                      style={{ color: accion.color || "inherit" }}
                    >
                      {accion.icono}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </OverflowTable>
  );
}

export default TablaGeneral;