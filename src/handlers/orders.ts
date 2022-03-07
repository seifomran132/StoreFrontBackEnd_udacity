import { OrderModel } from "../models/orders";
import express from 'express';
import { verifyToken } from "../middleware/auth";
import order from "../types/order.type";

const orderModel: OrderModel = new OrderModel
const ordersRouter: express.Router = express.Router();

// Get Order handler @params (u_id: number, completed: boolean = false)

const getorders = async (req: express.Request, res: express.Response): Promise<void>=> {
    
    const orders: order[] | string = await orderModel.getorders(req.body.user_id, req.body.status);
    res.json(orders);
}

// Simple Router

ordersRouter.get("/:id", verifyToken, getorders)

export default ordersRouter;