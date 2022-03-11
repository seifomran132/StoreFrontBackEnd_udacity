"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    // Index function for products
    async index() {
        try {
            const conn = await database_1.default.connect(); //Starting DB connection
            const sql = 'select * from product';
            const result = await conn.query(sql);
            conn.release(); // Release the connection
            return result.rows;
        }
        catch (err) {
            return `Could not find any products ${err}`;
        }
    }
    // create new product function
    async create(p) {
        try {
            const conn = await database_1.default.connect(); //Starting DB connection
            const sql = 'insert into product (name, price, category) values ($1, $2, $3) returning *';
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);
            conn.release(); // Release DB connection
            return result.rows[0];
        }
        catch (err) {
            return `Something went wrong in creating product ${err}`;
        }
    }
    // Show a specific product function
    async show(p_id) {
        try {
            const conn = await database_1.default.connect(); // Starting DB connection
            const sql = 'select * from product where product.id = $1';
            const result = await conn.query(sql, [p_id]);
            conn.release(); // Release the connection
            return result.rows[0];
        }
        catch (err) {
            return `Something went wrong in getting the product ${err}`;
        }
    }
    async showByCategory(p_cat) {
        try {
            const conn = await database_1.default.connect(); // Starting DB connection
            const sql = 'select * from product where product.category = $1';
            const result = await conn.query(sql, [p_cat]);
            conn.release(); // Release the connection
            return result.rows;
        }
        catch (err) {
            return `There is no products in this category ${err}`;
        }
    }
    async delete(p_id) {
        try {
            const conn = await database_1.default.connect(); // Starting DB connection
            const sql = 'delete from product where product.id = $1 returning *';
            const result = await conn.query(sql, [p_id]);
            conn.release(); // Release the connection
            return result.rows[0];
        }
        catch (err) {
            return `Something went wrong ${err}`;
        }
    }
}
exports.ProductModel = ProductModel;
