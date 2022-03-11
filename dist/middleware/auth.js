"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        var token = authHeader ? authHeader.split(' ')[1] : ' ';
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN);
        next();
    }
    catch (err) {
        res.sendStatus(401);
        next(err);
    }
}
exports.verifyToken = verifyToken;
