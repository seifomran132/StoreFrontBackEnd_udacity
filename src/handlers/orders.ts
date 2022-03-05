import { OrderModel } from "../models/orders";
import order from "../types/order.type";
import express from 'express';

const orderModel = new OrderModel

// Get Order handler @params (u_id: number, completed: boolean = false)

const getorders = async (req: express.Request, res: express.Response)=> {
    console.log(req.body.user_id)
    const orders = await orderModel.getorders(req.body.user_id, req.body.status);
    res.send(orders);
}

const ordersRouter = (app: express.Application)=>{
    app.get('/orders/:id', getorders);
}

export default ordersRouter;