"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const user_1 = require("../../models/user");
const orderModel = new orders_1.OrderModel;
const productModel = new products_1.ProductModel;
const userModel = new user_1.UsersModel;
describe("Test Order Model Functionality", () => {
    beforeAll(async () => {
        const ourUser = {
            firstname: "Seif",
            lastname: "Omran",
            password: "s123"
        };
        const ourProduct = {
            name: "Prod 1",
            price: 100,
            category: "Cat 1"
        };
        const createdUser = await userModel.create(ourUser);
        const createdProduct = await productModel.create(ourProduct);
    });
    afterAll(async () => {
        await orderModel.delete(1);
        await productModel.delete(1);
        await userModel.delete(1);
        const conn = await database_1.default.connect();
        const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE product_id_seq RESTART WITH 1;`;
        await conn.query(sql);
        conn.release();
    });
    it("Should contain get order function", () => {
        expect(orderModel.getorders).toBeDefined();
    });
    it("Should contain create order function", () => {
        expect(orderModel.createOrder).toBeDefined();
    });
    it("Should create a new order", async () => {
        const ourOrder = {
            user_id: 1,
            product_id: 1,
            quantity: 1,
            status: "completed"
        };
        const createdOrder = await orderModel.createOrder(ourOrder);
        expect(Object(createdOrder)["user_id"]).toBeTruthy();
        expect(Object(createdOrder)["product_id"]).toBeTruthy();
        expect(Object(createdOrder)["quantity"]).toBeTruthy();
        expect(Object(createdOrder)["status"]).toBeTruthy();
    });
    it("Should get order", async () => {
        const ourOrder = await orderModel.getorders(1);
        expect(Object(ourOrder[0])["user_id"]).toEqual(1);
        expect(Object(ourOrder[0])["product_id"]).toEqual(1);
        expect(Object(ourOrder[0])["quantity"]).toEqual(1);
        expect(Object(ourOrder[0])["status"]).toEqual("completed");
    });
    it("Should delete order", async () => {
        const deletedOrder = await orderModel.delete(1);
        expect(Object(deletedOrder)["user_id"]).toEqual(1);
        expect(Object(deletedOrder)["product_id"]).toEqual(1);
        expect(Object(deletedOrder)["quantity"]).toEqual(1);
        expect(Object(deletedOrder)["status"]).toEqual("completed");
    });
});
