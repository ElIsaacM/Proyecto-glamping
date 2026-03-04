import * as productService from '../services/product.service.js'

export const getProducts = async (req, res) => {
  const products = await productService.getProducts();

  res.json(products);
}

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);

  res.json(product)
}

export const createProduct = (req, res) => {
  const data = req.body;

  res.status(201).json({
    message: "producto creado",
    data
  });
}

export const updateProduct = (req, res) => {
  const { id } = req.params
  const data = req.body

  res.json({
    message: "Producto actualizado",
    productId: id,
    data
  });
}

export const sellProduct = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Simulacion (eliminar)
  const stockActual = 20;
  const nuevoStock = stockActual - quantity;

  res.json({
    message: "producto vendido", 
    productoId: id,
    stock: nuevoStock
  });
}

export const deleteProduct = (req, res) => {
  const id = req.params;

  res.json({
    message: "Producto desactivado",
    productoId: id
  });
}