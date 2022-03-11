"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../models/products");
const auth_1 = require("../middleware/auth");
const productModel = new products_1.ProductModel();
const productRouter = express_1.default.Router();
// Index function handler
const index = async (req, res) => {
    try {
        const products = await productModel.index();
        res.json(products);
    }
    catch (err) {
        res.send(err);
    }
};
// create new product handler @params (p: prouduct)
const create = async (req, res) => {
    const ourProduct = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
    };
    try {
        const createdProduct = await productModel.create(ourProduct);
        res.json(createdProduct);
    }
    catch (err) {
        res.send(err);
    }
};
// show function handler params (id: number)
const show = async (req, res) => {
    try {
        const showedProduct = await productModel.show(req.params.id);
        res.json(showedProduct);
    }
    catch (err) {
        res.send(err);
    }
};
const getByCategory = async (req, res) => {
    try {
        const allInCat = await productModel.showByCategory(req.query.category);
        res.json(allInCat);
    }
    catch (err) {
        res.send(err);
    }
};
const deleteProduct = async (req, res) => {
    try {
        const deletedUser = await productModel.delete(req.body.id);
        res.json({ message: 'product deleted', userDetails: deletedUser });
    }
    catch (err) {
        res.send(err);
    }
};
// Simple router
productRouter.get('/index', index);
productRouter.post('/create', auth_1.verifyToken, create);
productRouter.get('/show/:id', show);
productRouter.get('/index/category', getByCategory);
productRouter.delete('/delete/:id', auth_1.verifyToken, deleteProduct);
exports.default = productRouter;
