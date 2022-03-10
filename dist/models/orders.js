"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    async getorders(u_id, completed = false) {
        try {
            const conn = await database_1.default.connect(); // Start DB Connection
            if (completed) {
                const sql = `select * from orders where user_id = $1 and orders.status = 'completed'`;
                const result = await conn.query(sql, [u_id]);
                conn.release(); // Release DB Connection
                return result.rows;
            }
            const sql = `select * from orders where user_id = $1`;
            const result = await conn.query(sql, [u_id]);
            conn.release(); // Release DB Connection
            return result.rows;
        }
        catch (err) {
            return `something went wrong in retrieving the order ${err}`;
        }
    }
    async createOrder(o) {
        try {
            const conn = await database_1.default.connect(); // Start DB Connection
            const sql = `INSERT INTO orders(product_id, user_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *`;
            const result = await conn.query(sql, [o.product_id, o.user_id, o.quantity, o.status]);
            conn.release(); // Release DB Connection
            return result.rows[0];
        }
        catch (err) {
            return `Something went wrong ${err}`;
        }
    }
    async delete(o_id) {
        try {
            const conn = await database_1.default.connect(); // Starting DB connection
            const sql = "delete from orders where orders.id = $1 returning *";
            const result = await conn.query(sql, [o_id]);
            conn.release(); // Release the connection
            return result.rows[0];
        }
        catch (err) {
            return `Something went wrong ${err}`;
        }
    }
}
exports.OrderModel = OrderModel;
