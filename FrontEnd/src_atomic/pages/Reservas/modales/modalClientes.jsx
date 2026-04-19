import styled from "styled-components";
import { useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

import ModalPlantilla from "../../../components/organisms/Modales/modalPlantilla";

const ContentContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  display: grid;
  gap: 10px;  
`;

function ModalClientes({ id, onClose }) {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/customers/${id}`)
  }, [id]);

  if (loading) return <p>Cargando información del cliente...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>No hay información disponible.</p>;

  return (
    <ModalPlantilla titulo="Información del Cliente" onClose={onClose}>
      <ContentContainer>
        <p><strong>Nombre:</strong> {data.cliente}</p>
        <p><strong>Correo:</strong> {data.email || 'N/A'}</p>
        <p><strong>Contacto:</strong> {data.contacto || 'N/A'}</p>
        <p><strong>País:</strong> {data.residencia || 'N/A'}</p>
      </ContentContainer>
    </ModalPlantilla>
  );
}

export default ModalClientes;