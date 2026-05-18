import styled from "styled-components";
import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/fetchConnect";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background-color: red;
  }
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed #ccc;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #357ABD;
  }
  &:disabled {
    background-color: #a0c4ec;
    cursor: not-allowed;
  }
`;

export default function CabinImagesEditor({ cabanaId }) {
  const [images, setImages] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState("");
  
  const { fetchData, error } = useFetch();

  const loadImages = async () => {
    try {
      console.log("Cabana ID received in Editor:", cabanaId);
      setLoadingMsg("Cargando imágenes...");
      const data = await fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/cabins/${cabanaId}/images`);
      console.log("Images data fetched:", data);
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoadingMsg("");
    }
  };

  useEffect(() => {
    loadImages();
  }, [cabanaId]);

  const handleDelete = async (imgId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta imagen?")) return;
    
    try {
      setLoadingMsg("Eliminando imagen...");
      await fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/cabins/images/${imgId}`, {
        method: "DELETE"
      });
      loadImages();
    } catch (err) {
      console.error(err);
      setLoadingMsg("");
    }
  };

  const handleUpload = async () => {
    if (!filesToUpload || filesToUpload.length === 0) return;
    
    try {
      setLoadingMsg("Subiendo imágenes...");
      const formData = new FormData();
      for (let i = 0; i < filesToUpload.length; i++) {
        formData.append("imagenes", filesToUpload[i]);
      }
      
      await fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/cabins/${cabanaId}/images`, {
        method: "POST",
        body: formData
      });
      
      setFilesToUpload(null);
      document.getElementById("file-upload").value = "";
      loadImages();
    } catch (err) {
      console.error(err);
      setLoadingMsg("");
    }
  };

  return (
    <Container>
      {loadingMsg && <p style={{ color: "#4A90E2", fontWeight: "bold" }}>{loadingMsg}</p>}
      {error && <p style={{ color: "red" }}>Error de red: {error}</p>}
      
      {!loadingMsg && images.length === 0 && <p>No hay imágenes subidas para esta cabaña.</p>}
      
      <ImageGrid>
        {images.map(img => (
          <ImageWrapper key={img.img_id}>
            <img src={img.img_url} alt="Cabaña" />
            <DeleteBtn type="button" onClick={() => handleDelete(img.img_id)}>X</DeleteBtn>
          </ImageWrapper>
        ))}
      </ImageGrid>

      <UploadSection>
        <h4>Agregar Nuevas Imágenes</h4>
        <input 
          id="file-upload"
          type="file" 
          multiple 
          accept="image/*" 
          onChange={(e) => setFilesToUpload(e.target.files)} 
        />
        <Button 
          type="button" 
          onClick={handleUpload} 
          disabled={!filesToUpload || filesToUpload.length === 0 || loadingMsg}
        >
          Subir Imágenes
        </Button>
      </UploadSection>
    </Container>
  );
}
