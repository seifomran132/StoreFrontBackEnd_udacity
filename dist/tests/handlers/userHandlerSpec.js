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
let token = ""; // Will be asigned to the token value after creating user
let createdUser; // Will be assigned to the created user
describe("Test User Endpoints", () => {
    const testUser = {
        firstname: "seif",
        lastname: "omran",
        password: "test123",
    };
    beforeAll(async () => {
        const created = await userModel.create(testUser);
        token = Object(created)["token"];
        createdUser = Object(created)["user"];
    });
    afterAll(async () => {
        await userModel.delete(1);
        await userModel.delete(2);
        const conn = await database_1.default.connect();
        const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE product_id_seq RESTART WITH 1;`;
        await conn.query(sql);
        conn.release();
    });
    it("Should Test Server is working", async () => {
        const response = await Supertest.get("/");
        expect(response.status).toEqual(200);
    });
    it("Should Test create endpoint", async () => {
        const response = await Supertest.post("/user/create").send({
            firstname: "mohamed",
            lastname: "sayed",
            password: "123456",
        });
        expect(response.status).toEqual(200);
        const { firstname, lastname } = response.body.user;
        expect(firstname).toEqual("mohamed");
        expect(lastname).toEqual("sayed");
    });
    it("Should Test index endpoint", async () => {
        const response = await Supertest.get("/user/index").set("Authorization", "Bearer " + token);
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(2);
    });
    it("Should Test show endpoint", async () => {
        const response = await Supertest.get("/user/show/:2").set("Authorization", "Bearer " + token).send({ id: "2" });
        expect(response.status).toEqual(200);
        const { firstname, lastname } = response.body;
        expect(firstname).toEqual("mohamed");
        expect(lastname).toEqual("sayed");
    });
    it("Should Test delete endpoint", async () => {
        const response = await Supertest.delete("/user/delete/:2").set("Authorization", "Bearer " + token).send({ id: "2" });
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('user deleted');
    });
});
