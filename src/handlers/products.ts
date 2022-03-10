import express from 'express';
import product from '../types/product.type';
import { ProductModel } from '../models/products';
import { verifyToken } from '../middleware/auth';


const productModel: ProductModel = new ProductModel;
const productRouter: express.Router = express.Router();

// Index function handler

const index = async (req: express.Request, res: express.Response): Promise<void>=>{
    const products: product[] | string = await productModel.index();
    res.json(products);
}


// create new product handler @params (p: prouduct)

const create = async (req: express.Request, res: express.Response): Promise<void>=>{
    const ourProduct : product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category
    }
    const createdProduct: product | string = await productModel.create(ourProduct);
    res.json(createdProduct);
}

// show function handler params (id: number)

const show = async (req: express.Request, res: express.Response): Promise<void>=>{
    const showedProduct: product | string = await productModel.show(req.body.id)
    res.json(showedProduct)
}

const getByCategory = async (req: express.Request, res: express.Response): Promise<void> => {
    const allInCat: product[] | string = await productModel.showByCategory(req.body.category);
    res.json(allInCat);
}

const deleteProduct = async (req: express.Request, res:express.Response): Promise<void> => {
    const deletedUser = await productModel.delete(req.body.id);
    res.json({message: 'product deleted', userDetails: deletedUser});
}

// Simple router



productRouter.get('/index', index);
productRouter.post('/create', verifyToken, create);
productRouter.get('/show/:id', show);
productRouter.get('/index/category', getByCategory);
productRouter.delete('/delete/:id',verifyToken, deleteProduct);



export default productRouter;