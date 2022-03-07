import express from 'express';
import user from '../types/user.type'
import {UsersModel} from '../models/user'
import { verifyToken } from '../middleware/auth';
const userModel = new UsersModel;
const UserRouter = express.Router()


// Handler for the index function in UserModel

const index = async (req: express.Request, res:express.Response)=>{
    const users = await userModel.index();
    res.send(users)
}

// Handler for create user function @params (u: user)

const create = async (req: express.Request, res:express.Response)=>{
    const ourUser: user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    const createdUser = await userModel.create(ourUser);
    console.log(req.headers.authorization)
    res.send(createdUser);
}

// Handler for create user function @params (id: number)

const show = async (req: express.Request, res:express.Response)=>{
    const showedUser = await userModel.show(req.body.id)
    res.json(showedUser)
}

// Simple router

UserRouter.get("/index" , verifyToken, index)
UserRouter.post("/create", verifyToken, create)
UserRouter.get("/show/:id", verifyToken, show)


export default UserRouter