import { OrderModel } from '../models/orders';
import express from 'express';
import { verifyToken } from '../middleware/auth';
import order from '../types/order.type';

const orderModel: OrderModel = new OrderModel();
const ordersRouter: express.Router = express.Router();

// Get Order handler @params (u_id: number, completed: boolean = false)

const getorders = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const orders: order[] | string = await orderModel.getorders(
      req.params.id,
      req.query.status
    );
    res.json(orders);
  }
  catch (err) {
    res.send(err)
  }
  
};
const createOrder = async (req: express.Request, res: express.Response) => {
  const ourOrder: order = {
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    quantity: req.body.quantity,
    status: req.body.status,
  };
  try {
    const createdOrder = await orderModel.createOrder(ourOrder);
    res.json(createdOrder);
  }
  catch (err) {
    res.send(err)
  }
  
};

const deleteOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const deletedOrder = await orderModel.delete(req.body.id);
    res.json({ message: 'order deleted', userDetails: deletedOrder });
  }
  catch(err) {
    res.send(err)
  }
  
};

// Simple Router

ordersRouter.get('/:id', verifyToken, getorders);
ordersRouter.post('/create', verifyToken, createOrder);
ordersRouter.delete('/delete/:id', verifyToken, deleteOrder);

export default ordersRouter;
