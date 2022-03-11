"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const Supertest = (0, supertest_1.default)(server_1.default);
const userModel = new user_1.UsersModel();
let token = ''; // Will be asigned to the token value after creating user
describe('Test product endpoints', () => {
    const testUser = {
        firstname: 'seif',
        lastname: 'omran',
        password: 'test123',
    };
    beforeAll(async () => {
        const created = await userModel.create(testUser);
        token = Object(created)['token'];
        Object(created)['user'];
    });
    afterAll(async () => {
        await userModel.delete(1);
        const conn = await database_1.default.connect();
        const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE product_id_seq RESTART WITH 1;`;
        await conn.query(sql);
        conn.release();
    });
    it('Should test create product endpoint', async () => {
        const response = await Supertest.post('/product/create')
            .set('Authorization', 'Bearer ' + token)
            .send({
            name: 'Test Product',
            price: 1000,
            category: 'Test Category',
        });
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual('Test Product');
        expect(response.body.price).toEqual(1000);
        expect(response.body.category).toEqual('Test Category');
    });
    it('Should test show product endpoint', async () => {
        const response = await Supertest.get('/product/show/1');
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual('Test Product');
        expect(response.body.price).toEqual(1000);
        expect(response.body.category).toEqual('Test Category');
    });
    it('Should test index products endpoint', async () => {
        const response = await Supertest.get('/product/index');
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
    });
    it('Should test get product by category endpoint', async () => {
        const response = await Supertest.get('/product/index/category/?category=Test Category');
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].category).toEqual('Test Category');
    });
    it('Should test get product by category endpoint', async () => {
        const response = await Supertest.get('/product/index/category/?category=Test Category');
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].category).toEqual('Test Category');
    });
    it('Should test delete product endpoint', async () => {
        const response = await Supertest.delete('/product/delete/:1')
            .set('Authorization', 'Bearer ' + token)
            .send({
            id: 1,
        });
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('product deleted');
    });
});
