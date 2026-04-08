import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  border-radius: 0 0 5px 5px;

  button {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    color: #374151;
    cursor: pointer;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: #f3f4f6;
      border-color: #9ca3af;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: #f9fafb;
    }
  }

  span {
    font-size: 0.95rem;
    color: #4b5563;
    font-weight: 500;
  }
`;

function Paginacion({ currentPage, totalPages, paginate }) {
  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="bi bi-chevron-left" style={{ marginRight: '5px' }}></i>
        Anterior
      </button>
      <span>Página {currentPage} de {totalPages}</span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
        <i className="bi bi-chevron-right" style={{ marginLeft: '5px' }}></i>
      </button>
    </PaginationContainer>
  );
}

export default Paginacion;
