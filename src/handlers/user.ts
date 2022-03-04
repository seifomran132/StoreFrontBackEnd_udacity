import express from 'express';
import user from '../types/user.type'
import {UsersModel} from '../models/user'

const userModel = new UsersModel;
const router = express.Router()


const indexHandler = async (req: express.Request, res:express.Response)=>{
    const users = await userModel.index();
    res.send(users)
}

const createHandler = async (req: express.Request, res:express.Response)=>{
    const ourUser: user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    const createdUser = await userModel.create(ourUser);
    res.send(createdUser);
}
const showHandler = async (req: express.Request, res:express.Response)=>{
    const showedUser = await userModel.show(req.body.id)
    res.json(showedUser)
}

const userRoute = (app: express.Application)=>{
    app.post("/create", createHandler)
    app.get("/index", indexHandler)
    app.get("/show/:id", showHandler)

    
    
}

export default userRoute