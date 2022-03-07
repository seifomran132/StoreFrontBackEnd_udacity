import { OrderModel } from "../models/orders";
import order from "../types/order.type";
import express from 'express';
import { verify } from "jsonwebtoken";
import { verifyToken } from "../middleware/auth";

const orderModel = new OrderModel
const ordersRouter = express.Router();

// Get Order handler @params (u_id: number, completed: boolean = false)

const getorders = async (req: express.Request, res: express.Response)=> {
    
    const orders = await orderModel.getorders(req.body.user_id, req.body.status);
    res.send(orders);
}

// Simple Router

ordersRouter.get("/:id", verifyToken, getorders)

export default ordersRouter;