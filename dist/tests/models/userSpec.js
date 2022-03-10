"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const userModel = new user_1.UsersModel;
describe("User Model Test", () => {
    it("Should contain index function", () => {
        expect(userModel.index).toBeDefined();
    });
    it("Should contain create function", () => {
        expect(userModel.create).toBeDefined();
    });
    it("Should contain show function", () => {
        expect(userModel.show).toBeDefined();
    });
    it("Should contain delete function", () => {
        expect(userModel.delete).toBeDefined();
    });
    it("Should create a user to users table", async () => {
        const testUser = {
            firstname: "seif",
            lastname: "omran",
            password: "test123"
        };
        const created = await userModel.create(testUser);
        expect(Object(created)["token"]).toBeTruthy();
        expect(Object(created)["user"]).toBeTruthy();
    });
    it("Should test index function", async () => {
        const ourUser = await userModel.index();
        expect(Object(ourUser[0])["firstname"]).toEqual("seif");
        expect(Object(ourUser[0])["lastname"]).toEqual("omran");
        expect(Object(ourUser[0])["password"]).not.toEqual("test123");
    });
    it("Should test show function", async () => {
        const ourUser = await userModel.show(1);
        expect(Object(ourUser)["firstname"]).toEqual("seif");
        expect(Object(ourUser)["lastname"]).toEqual("omran");
        expect(Object(ourUser)["password"]).not.toEqual("test123");
    });
    it("Should test delete function", async () => {
        const deletedUser = await userModel.delete(1);
        expect(Object(deletedUser)["firstname"]).toEqual("seif");
        expect(Object(deletedUser)["lastname"]).toEqual("omran");
        expect(Object(deletedUser)["password"]).not.toEqual("test123");
    });
});
