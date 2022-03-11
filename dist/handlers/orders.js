"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const orderModel = new orders_1.OrderModel();
const ordersRouter = express_1.default.Router();
// Get Order handler @params (u_id: number, completed: boolean = false)
const getorders = async (req, res) => {
    const orders = await orderModel.getorders(req.body.user_id, req.body.status);
    res.json(orders);
};
const createOrder = async (req, res) => {
    const ourOrder = {
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        quantity: req.body.quantity,
        status: req.body.status,
    };
    const createdOrder = await orderModel.createOrder(ourOrder);
    res.json(createdOrder);
};
const deleteOrder = async (req, res) => {
    const deletedOrder = await orderModel.delete(req.body.id);
    res.json({ message: 'order deleted', userDetails: deletedOrder });
};
// Simple Router
ordersRouter.get('/:id', auth_1.verifyToken, getorders);
ordersRouter.post('/create', auth_1.verifyToken, createOrder);
ordersRouter.delete('/delete/:id', auth_1.verifyToken, deleteOrder);
exports.default = ordersRouter;
