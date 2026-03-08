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

export const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const newProduct = await productService.createProduct(data);

    res.status(201).json({
      message: "producto creado exitosamente",
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear producto",
      error: error.message
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const updatedProduct = await productService.updateProduct(id, data);

    res.status(200).json({
      message: "Producto actualizado",
      productId: id,
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar producto",
      error: error.message
    });
  }
}

export const sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const soldProduct = await productService.sellProduct(id, quantity);

    res.status(200).json({
      message: "producto vendido",
      productoId: id,
      stock: soldProduct.stock
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al vender producto",
      error: error.message
    });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);

    res.status(200).json({
      message: "Producto eliminado",
      productoId: id
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar producto",
      error: error.message
    });
  }
}