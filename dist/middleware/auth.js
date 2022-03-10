"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(" ")[1] : " ";
        jsonwebtoken_1.default.verify(token, process.env.TOKEN);
        next();
    }
    catch (err) {
        res.sendStatus(401);
        next(err);
    }
}
exports.verifyToken = verifyToken;
