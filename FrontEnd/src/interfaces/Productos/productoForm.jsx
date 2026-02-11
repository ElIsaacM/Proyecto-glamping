import styled from "styled-components";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  resize: none;
  height: 90px;
`;

const Button = styled.button`
  align-self: flex-end;
  background: #3f5f3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
`;

function ProductoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: "",
    estado: "",
    precioCompra: "",
    precioVenta: "",
    descripcion: "",
    tipo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Input
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />

        <Select name="estado" onChange={handleChange}>
          <option value="">Estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </Select>
      </Row>

      <Row>
        <Input
          name="precioCompra"
          placeholder="$ Precio de compra"
          onChange={handleChange}
        />

        <Input
          name="precioVenta"
          placeholder="$ Precio de venta"
          onChange={handleChange}
        />
      </Row>

      <TextArea
        name="descripcion"
        placeholder="Descripción"
        onChange={handleChange}
      />

      <Select name="tipo" onChange={handleChange}>
        <option value="">Tipo</option>
        <option value="bebida">Bebida</option>
        <option value="comida">Comida</option>
      </Select>

      <Button type="submit">
        <i className="bi bi-plus-circle"></i> Agregar
      </Button>
    </Form>
  );
}

export default ProductoForm;
