"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const userModel = new user_1.UsersModel();
const UserRouter = express_1.default.Router();
// Handler for the index function in UserModel
const index = async (req, res) => {
    try {
        const users = await userModel.index();
        res.json(users);
    }
    catch (err) {
        res.send(err);
    }
};
// Handler for create user function @params (u: user)
const create = async (req, res) => {
    const ourUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    try {
        const createdUser = await userModel.create(ourUser);
        res.json(createdUser);
    }
    catch (err) {
        res.send(err);
    }
};
// Handler for create user function @params (id: number)
const show = async (req, res) => {
    try {
        const showedUser = await userModel.show(req.params.id);
        res.json(showedUser);
    }
    catch (err) {
        res.send(err);
    }
};
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.delete(req.body.id);
        res.json({ message: 'user deleted', userDetails: deletedUser });
    }
    catch (err) {
        res.send(err);
    }
};
// Simple router
UserRouter.get('/index', auth_1.verifyToken, index);
UserRouter.post('/create', create);
UserRouter.get('/show/:id', auth_1.verifyToken, show);
UserRouter.delete('/delete/:id', auth_1.verifyToken, deleteUser);
exports.default = UserRouter;
