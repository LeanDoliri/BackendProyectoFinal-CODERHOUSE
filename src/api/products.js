import { Router } from 'express';
import ProductsDAOMongoDB from "../models/dao/Products.DAO.js";

export const apiProducts = Router();

const productsApi = new ProductsDAOMongoDB();

apiProducts.get('/', async (req, res) => {
  const products = await productsApi.getAll();

  res.send(products);
});

apiProducts.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await productsApi.getById(id);

  res.send(product);
});

apiProducts.post('/', async (req, res) => {
  const product = req.body;
  const savedProduct = await productsApi.save(product);

  res.send(savedProduct);
});

apiProducts.put('/:id', async (req, res) => {
  const idProductUpdate = req.params.id;

  const productUpdate = req.body;
  const updatedProduct = await productsApi.update(
    idProductUpdate,
    productUpdate
  );

  res.send(updatedProduct);
});

apiProducts.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await productsApi.delete(id);

  res.send({ message: 'Producto eliminado correctamente' });
});