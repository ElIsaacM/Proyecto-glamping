import { useState, useRef } from "react";
import styled from "styled-components";

/* ─── Estilos ────────────────────────────────────────────── */
const Wrapper = styled.section`
  margin-top: 40px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  color: #2d3a25;
  display: flex;
  align-items: center;
  gap: 8px;

  i { font-size: 1.1rem; color: #43523a; }
`;

const CabanaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
`;

const CabanaCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s;

  &:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.11); }
`;

const CardHeader = styled.div`
  padding: 14px 18px;
  background: #43523a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 { margin: 0; font-size: 1rem; }
  span { font-size: 0.8rem; opacity: 0.75; }
`;

const ImageList = styled.div`
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 60px;
`;

const EmptyMsg = styled.p`
  color: #aaa;
  font-size: 0.88rem;
  text-align: center;
  padding: 20px 0;
`;

const ImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f8f8;
  border-radius: 8px;
  padding: 8px 10px;
  border: 1px solid #eee;
  transition: background 0.15s;

  &:hover { background: #f0f5ee; }
`;

const Orden = styled.span`
  min-width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #43523a;
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Thumb = styled.img`
  width: 56px;
  height: 42px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
  flex-shrink: 0;
`;

const ImgInfo = styled.div`
  flex: 1;
  overflow: hidden;

  p {
    font-size: 0.82rem;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
  span {
    font-size: 0.75rem;
    color: #999;
  }
`;

const RowActions = styled.div`
  display: flex;
  gap: 6px;
`;

const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${p => p.danger ? '#ffcdd2' : '#e0e0e0'};
  background: ${p => p.danger ? '#fff5f5' : '#fff'};
  color: ${p => p.danger ? '#e53935' : '#43523a'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: all 0.15s;

  &:hover {
    background: ${p => p.danger ? '#ffebee' : '#f0f5ee'};
    border-color: ${p => p.danger ? '#e53935' : '#43523a'};
  }
`;

const OrderBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SmallBtn = styled.button`
  width: 20px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  font-size: 0.6rem;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 0.1s;

  &:hover { background: #f0f5ee; }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

const UploadZone = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 18px 14px;
  padding: 10px;
  border: 2px dashed #c3d1bc;
  border-radius: 8px;
  color: #43523a;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f5ee;
    border-color: #43523a;
  }

  input { display: none; }
  i { font-size: 1rem; }
`;

/* ─── Datos de cabañas iniciales ─────────────────────────── */
const CABANAS_INIT = [
  { id: 1, nombre: "Palmas",    imagenes: [] },
  { id: 2, nombre: "El Roble",  imagenes: [] },
  { id: 3, nombre: "La Ceiba",  imagenes: [] },
];

/* ─── Componente principal ───────────────────────────────── */
function GestorImagenes() {
  const [cabanas, setCabanas] = useState(CABANAS_INIT);
  const inputRefs = useRef({});

  /* Agregar imagen */
  const handleFileChange = (cabanaId, e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const nuevas = files.map((file) => ({
      id: Date.now() + Math.random(),
      nombre: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      url: URL.createObjectURL(file),
      file,
    }));

    setCabanas((prev) =>
      prev.map((c) =>
        c.id === cabanaId
          ? { ...c, imagenes: [...c.imagenes, ...nuevas] }
          : c
      )
    );
    // reset input
    e.target.value = "";
  };

  /* Reemplazar imagen */
  const handleReemplazar = (cabanaId, imgId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const nueva = {
      id: imgId,
      nombre: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      url: URL.createObjectURL(file),
      file,
    };

    setCabanas((prev) =>
      prev.map((c) =>
        c.id === cabanaId
          ? { ...c, imagenes: c.imagenes.map((img) => img.id === imgId ? nueva : img) }
          : c
      )
    );
    e.target.value = "";
  };

  /* Eliminar imagen */
  const handleEliminar = (cabanaId, imgId) => {
    setCabanas((prev) =>
      prev.map((c) =>
        c.id === cabanaId
          ? { ...c, imagenes: c.imagenes.filter((img) => img.id !== imgId) }
          : c
      )
    );
  };

  /* Mover arriba */
  const moverArriba = (cabanaId, index) => {
    setCabanas((prev) =>
      prev.map((c) => {
        if (c.id !== cabanaId || index === 0) return c;
        const imgs = [...c.imagenes];
        [imgs[index - 1], imgs[index]] = [imgs[index], imgs[index - 1]];
        return { ...c, imagenes: imgs };
      })
    );
  };

  /* Mover abajo */
  const moverAbajo = (cabanaId, index, total) => {
    setCabanas((prev) =>
      prev.map((c) => {
        if (c.id !== cabanaId || index === total - 1) return c;
        const imgs = [...c.imagenes];
        [imgs[index], imgs[index + 1]] = [imgs[index + 1], imgs[index]];
        return { ...c, imagenes: imgs };
      })
    );
  };

  return (
    <Wrapper>
      <SectionTitle>
        <i className="bi bi-images" />
        Galería de Imágenes por Cabaña
      </SectionTitle>

      <CabanaGrid>
        {cabanas.map((cabana) => (
          <CabanaCard key={cabana.id}>
            {/* Header */}
            <CardHeader>
              <h4><i className="bi bi-house-fill" style={{ marginRight: 6 }} />{cabana.nombre}</h4>
              <span>{cabana.imagenes.length} imagen{cabana.imagenes.length !== 1 ? "es" : ""}</span>
            </CardHeader>

            {/* Lista ordenada de imágenes */}
            <ImageList>
              {cabana.imagenes.length === 0 ? (
                <EmptyMsg>Sin imágenes aún. Sube la primera.</EmptyMsg>
              ) : (
                cabana.imagenes.map((img, idx) => (
                  <ImageRow key={img.id}>
                    {/* Número de orden */}
                    <Orden>{idx + 1}</Orden>

                    {/* Botones subir / bajar */}
                    <OrderBtns>
                      <SmallBtn
                        onClick={() => moverArriba(cabana.id, idx)}
                        disabled={idx === 0}
                        title="Subir en orden"
                      >▲</SmallBtn>
                      <SmallBtn
                        onClick={() => moverAbajo(cabana.id, idx, cabana.imagenes.length)}
                        disabled={idx === cabana.imagenes.length - 1}
                        title="Bajar en orden"
                      >▼</SmallBtn>
                    </OrderBtns>

                    {/* Thumbnail */}
                    <Thumb src={img.url} alt={img.nombre} />

                    {/* Info */}
                    <ImgInfo>
                      <p title={img.nombre}>{img.nombre}</p>
                      <span>{img.size}</span>
                    </ImgInfo>

                    {/* Acciones */}
                    <RowActions>
                      {/* Reemplazar */}
                      <label title="Reemplazar imagen">
                        <IconBtn as="span" title="Reemplazar">
                          <i className="bi bi-pencil-fill" />
                        </IconBtn>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handleReemplazar(cabana.id, img.id, e)}
                        />
                      </label>

                      {/* Eliminar */}
                      <IconBtn
                        danger
                        title="Eliminar imagen"
                        onClick={() => handleEliminar(cabana.id, img.id)}
                      >
                        <i className="bi bi-trash-fill" />
                      </IconBtn>
                    </RowActions>
                  </ImageRow>
                ))
              )}
            </ImageList>

            {/* Zona de subida */}
            <UploadZone>
              <i className="bi bi-cloud-upload-fill" />
              Agregar imágenes
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(cabana.id, e)}
              />
            </UploadZone>
          </CabanaCard>
        ))}
      </CabanaGrid>
    </Wrapper>
  );
}

export default GestorImagenes;
