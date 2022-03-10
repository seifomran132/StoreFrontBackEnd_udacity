"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;
class UsersModel {
    // Index function to get all users from database
    async index() {
        try {
            const conn = await database_1.default.connect(); //Starting DB connection
            const sql = "select * from users";
            const result = await conn.query(sql);
            conn.release(); // Release the connection
            return result.rows;
        }
        catch (err) {
            throw new Error("Something went wrong, can not return users");
        }
    }
    // Create function to insert user to database
    async create(u) {
        try {
            const conn = await database_1.default.connect(); // Starting DB connection
            const sql = "INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
            const hashed = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt));
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                hashed,
            ]);
            conn.release(); // Release the connection
            const token = jsonwebtoken_1.default.sign(result.rows[0], process.env.TOKEN);
            return { user: result.rows[0], token: token };
        }
        catch (err) {
            return `User does not exist ${err}`;
        }
    }
    // Create function to insert user to database
    async show(u_id) {
        try {
            const conn = await database_1.default.connect(); // Starting DB connection
            const sql = "select * from users where users.id = $1";
            const result = await conn.query(sql, [u_id]);
            conn.release(); // Release the connection
            return result.rows[0];
        }
        catch (err) {
            return `User does not exist ${err}`;
        }
    }
    async delete(u_id) {
        try {
            const conn = await database_1.default.connect(); // Starting DB connection
            const sql = "delete from users where users.id = $1 returning *";
            const result = await conn.query(sql, [u_id]);
            conn.release(); // Release the connection
            return result.rows[0];
        }
        catch (err) {
            return `Something went wrong ${err}`;
        }
    }
}
exports.UsersModel = UsersModel;
