"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const user_1 = require("../../models/user");
const products_1 = require("../../models/products");
const server_1 = __importDefault(require("../../server"));
const orders_1 = require("../../models/orders");
const Supertest = (0, supertest_1.default)(server_1.default);
const userModel = new user_1.UsersModel();
const productModel = new products_1.ProductModel();
const orderModel = new orders_1.OrderModel();
let token = ''; // Will be asigned to the token value after creating user
describe('Test order endpoints', () => {
    const testUser = {
        firstname: 'seif',
        lastname: 'omran',
        password: 'test123',
    };
    const testProduct = {
        name: 'Test Prod',
        price: 1000,
        category: 'Test Category',
    };
    beforeAll(async () => {
        const created = await userModel.create(testUser);
        await productModel.create(testProduct);
        token = Object(created)['token'];
        Object(created)['user'];
    });
    afterAll(async () => {
        await orderModel.delete(1);
        await productModel.delete(1);
        await userModel.delete(1);
        const conn = await database_1.default.connect();
        const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE product_id_seq RESTART WITH 1;ALTER SEQUENCE orders_id_seq RESTART WITH 1;`;
        await conn.query(sql);
        conn.release();
    });
    it('Should test create order fucntion', async () => {
        const response = await Supertest.post('/orders/create')
            .set('Authorization', 'Bearer ' + token)
            .send({
            product_id: 1,
            user_id: 1,
            quantity: 1,
            status: 'completed',
        });
        expect(response.status).toEqual(200);
    });
    it('Should test get order fucntion', async () => {
        const response = await Supertest.get('/orders/:1')
            .set('Authorization', 'Bearer ' + token)
            .send({
            user_id: 1,
        });
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].id).toEqual(1);
        expect(response.body[0].product_id).toEqual(1);
        expect(response.body[0].user_id).toEqual(1);
        expect(response.body[0].quantity).toEqual(1);
        expect(response.body[0].status).toEqual('completed');
    });
    it('Should test delete order fucntion', async () => {
        const response = await Supertest.delete('/orders/delete/:1')
            .set('Authorization', 'Bearer ' + token)
            .send({
            id: 1,
        });
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('order deleted');
    });
});
