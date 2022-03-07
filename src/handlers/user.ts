import express from 'express';
import {user, createdUser} from '../types/user.type'
import {UsersModel} from '../models/user'
import { verifyToken } from '../middleware/auth';
const userModel: UsersModel = new UsersModel;
const UserRouter: express.Router = express.Router()


// Handler for the index function in UserModel

const index = async (req: express.Request, res:express.Response): Promise<void>=>{
    const users: user[] = await userModel.index();
    res.json(users)
}

// Handler for create user function @params (u: user)

const create = async (req: express.Request, res:express.Response): Promise<void>=>{
    const ourUser: user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    const createdUser: createdUser | string = await userModel.create(ourUser);
    res.json(createdUser);
}

// Handler for create user function @params (id: number)

const show = async (req: express.Request, res:express.Response): Promise<void>=>{
    const showedUser: user | string = await userModel.show(req.body.id)
    res.json(showedUser)
}

// Simple router

UserRouter.get("/index" , verifyToken, index)
UserRouter.post("/create", verifyToken, create)
UserRouter.get("/show/:id", verifyToken, show)


export default UserRouter