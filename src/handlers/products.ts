import express from 'express';
import product from '../types/product.type';
import { ProductModel } from '../models/products';
import { verifyToken } from '../middleware/auth';

const productModel: ProductModel = new ProductModel();
const productRouter: express.Router = express.Router();

// Index function handler

const index = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const products: product[] | string = await productModel.index();
    res.json(products);
  } catch (err) {
    res.send(err);
  }
};

// create new product handler @params (p: prouduct)

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const ourProduct: product = {
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
  };
  try {
    const createdProduct: product | string = await productModel.create(
      ourProduct
    );
    res.json(createdProduct);
  } catch (err) {
    res.send(err);
  }
};

// show function handler params (id: number)

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const showedProduct: product | string = await productModel.show(
      req.params.id
    );
    res.json(showedProduct);
  } catch (err) {
    res.send(err);
  }
};

const getByCategory = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const allInCat: product[] | string = await productModel.showByCategory(
      req.query.category
    );
    res.json(allInCat);
  } catch (err) {
    res.send(err);
  }
};

const deleteProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const deletedUser = await productModel.delete(req.body.id);
    res.json({ message: 'product deleted', userDetails: deletedUser });
  }
  catch (err) {
    res.send(err)
  }
  
};

// Simple router

productRouter.get('/index', index);
productRouter.post('/create', verifyToken, create);
productRouter.get('/show/:id', show);
productRouter.get('/index/category', getByCategory);
productRouter.delete('/delete/:id', verifyToken, deleteProduct);

export default productRouter;
