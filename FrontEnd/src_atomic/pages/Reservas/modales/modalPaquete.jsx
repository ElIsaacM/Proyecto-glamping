import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

import ModalPlantilla from "../../../components/organisms/Modales/modalPlantilla";

const ContentContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;  
`;

const ItemCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 210px;

  img {
    max-width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
    max-height: 70px;
    object-fit: cover;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const TabBoton = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => (props.$activo ? '#43523A' : '#848484ff')};
  color: ${(props) => (props.$activo ? 'white' : '#363636')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => (props.$activo ? '#2E3A27' : '#545454ff')};
  }
`;

function ModalPaquete({ id, onClose }) {
  const { data, loading, error, fetchData } = useFetch();
  const [activeTab, setActiveTab] = useState("paquete");

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages/${id}`);
  }, [id, fetchData]);

  const handleTabClick = (tab, urlSnippet) => {
    setActiveTab(tab);
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/packages/${id}${urlSnippet}`);
  };

  return (
    <ModalPlantilla titulo="Información del paquete" onClose={onClose}>
      
      <TabContainer>
        <TabBoton 
          $activo={activeTab === 'paquete'} 
          onClick={() => handleTabClick('paquete', '')}
        >
          Paquete
        </TabBoton>
        <TabBoton 
          $activo={activeTab === 'productos'} 
          onClick={() => handleTabClick('productos', '/products')}
        >
          Productos
        </TabBoton>
        <TabBoton 
          $activo={activeTab === 'servicios'} 
          onClick={() => handleTabClick('servicios', '/services')}
        >
          Servicios
        </TabBoton>
      </TabContainer>

      <ContentContainer>
        {loading && <p>Cargando información...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && data && (
          <>
          
            {/* VISTA PAQUETE */}
            {activeTab === 'paquete' && !Array.isArray(data) && (
              <>
                <p><strong>Tipo:</strong> {data.tipo}</p>
                <p><strong>Nombre:</strong> {data.nombre || 'N/A'}</p>
                <p><strong>Días Estadía:</strong> {data.dias || 'N/A'}</p>
                <p><strong>Descripción:</strong> {data.descripcion || 'N/A'}</p>  
              </>
            )}

            {/* VISTA PRODUCTOS */}
            {activeTab === 'productos' && Array.isArray(data) && (
              data.length > 0 ? data.map((item) => (
                <ItemCard key={item.id}>
                  {item.img_url && <img src={item.img_url} alt={item.producto} />}
                  <p><strong>Producto:</strong> {item.producto || 'N/A'}</p>
                  <p><strong>Cantidad:</strong> {item.cantidad || 'N/A'}</p>
                </ItemCard>
              )) : <p>No hay productos en este paquete.</p>
            )}

            {/* VISTA SERVICIOS */}
            {activeTab === 'servicios' && Array.isArray(data) && (
              data.length > 0 ? data.map((item) => (
                <ItemCard key={item.id}>
                  {item.img_url && <img src={item.img_url} alt={item.servicio} />}
                  <p><strong>Servicio:</strong> {item.servicio || 'N/A'}</p>
                  <p><strong>Personas:</strong> {item.personas || 'N/A'}</p>
                </ItemCard>
              )) : <p>No hay servicios en este paquete.</p>
            )}
          </>
        )}
      </ContentContainer>
      
    </ModalPlantilla>
  );
}

export default ModalPaquete;