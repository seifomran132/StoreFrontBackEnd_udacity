"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./handlers/user"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
// userRoute(app);
app.use("/user", user_1.default);
app.use("/product", products_1.default);
app.use("/orders", orders_1.default);
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
