import express from 'express';
import product from '../types/product.type';
import { ProductModel } from '../models/products';


const productModel = new ProductModel;


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


// Simple router

const productRouter = (app: express.Application)=>{
    app.get('/product/index', index)
    app.post('/product/create', create)
    app.get('/product/show/:id', show)

}

export default productRouter;