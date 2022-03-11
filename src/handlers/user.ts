import express from 'express';
import { user, createdUser } from '../types/user.type';
import { UsersModel } from '../models/user';
import { verifyToken } from '../middleware/auth';
const userModel: UsersModel = new UsersModel();
const UserRouter: express.Router = express.Router();

// Handler for the index function in UserModel

const index = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const users: user[] = await userModel.index();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
};

// Handler for create user function @params (u: user)

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const ourUser: user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const createdUser: createdUser | string = await userModel.create(ourUser);
    res.json(createdUser);
  } catch (err) {
    res.send(err);
  }
};

// Handler for create user function @params (id: number)

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const showedUser: user | string = await userModel.show(req.params.id);
    res.json(showedUser);
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const deletedUser = await userModel.delete(req.body.id);
    res.json({ message: 'user deleted', userDetails: deletedUser });
  } catch (err) {
    res.send(err);
  }
};

// Simple router

UserRouter.get('/index', verifyToken, index);
UserRouter.post('/create', create);
UserRouter.get('/show/:id', verifyToken, show);
UserRouter.delete('/delete/:id', verifyToken, deleteUser);

export default UserRouter;
