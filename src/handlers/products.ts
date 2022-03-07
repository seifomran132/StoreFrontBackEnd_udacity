import express from 'express';
import product from '../types/product.type';
import { ProductModel } from '../models/products';
import { verify } from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth';


const productModel = new ProductModel;
const productRouter = express.Router();

// Index function handler

const index = async (req: express.Request, res: express.Response)=>{
    const products = await productModel.index();
    res.send(products);
}


// create new product handler @params (p: prouduct)

const create = async (req: express.Request, res: express.Response)=>{
    const ourProduct : product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category
    }
    const createdProduct = await productModel.create(ourProduct);
    res.send(createdProduct);
}

// show function handler params (id: number)

const show = async (req: express.Request, res: express.Response)=>{
    const showedProduct = await productModel.show(req.body.id)
    res.json(showedProduct)
}

const getByCategory = async (req: express.Request, res: express.Response) => {
    const allInCat = await productModel.showByCategory(req.body.category);
    res.json(allInCat);
}


// Simple router



productRouter.get('/index', index);
productRouter.post('/create', verifyToken, create);
productRouter.get('/show/:id', show);
productRouter.get('/index/category', getByCategory);



export default productRouter;