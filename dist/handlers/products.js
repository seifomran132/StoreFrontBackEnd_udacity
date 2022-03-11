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
    const products = await productModel.index();
    res.json(products);
};
// create new product handler @params (p: prouduct)
const create = async (req, res) => {
    const ourProduct = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
    };
    const createdProduct = await productModel.create(ourProduct);
    res.json(createdProduct);
};
// show function handler params (id: number)
const show = async (req, res) => {
    const showedProduct = await productModel.show(req.body.id);
    res.json(showedProduct);
};
const getByCategory = async (req, res) => {
    const allInCat = await productModel.showByCategory(req.body.category);
    res.json(allInCat);
};
const deleteProduct = async (req, res) => {
    const deletedUser = await productModel.delete(req.body.id);
    res.json({ message: 'product deleted', userDetails: deletedUser });
};
// Simple router
productRouter.get('/index', index);
productRouter.post('/create', auth_1.verifyToken, create);
productRouter.get('/show/:id', show);
productRouter.get('/index/category', getByCategory);
productRouter.delete('/delete/:id', auth_1.verifyToken, deleteProduct);
exports.default = productRouter;
