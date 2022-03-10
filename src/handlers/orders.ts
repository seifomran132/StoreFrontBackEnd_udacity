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
  const orders: order[] | string = await orderModel.getorders(
    req.body.user_id,
    req.body.status
  );
  res.json(orders);
};
const createOrder = async (req: express.Request, res: express.Response) => {
  const ourOrder: order = {
    product_id: req.body.product_id,
    user_id: req.body.product_id,
    quantity: req.body.quantity,
    status: req.body.status,
  };
  const createdOrder = await orderModel.createOrder(ourOrder);
  res.json(createdOrder);
};

const deleteOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const deletedOrder = await orderModel.delete(req.body.id);
  res.json({ message: 'order deleted', userDetails: deletedOrder });
};

// Simple Router

ordersRouter.get('/:id', verifyToken, getorders);
ordersRouter.post('/create', verifyToken, createOrder);
ordersRouter.delete('/delete/:id', verifyToken, deleteOrder);

export default ordersRouter;
