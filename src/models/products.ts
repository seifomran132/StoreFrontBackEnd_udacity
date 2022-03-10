import { PoolClient, QueryResult } from "pg";
import client from "../database";
import product from "../types/product.type";

export class ProductModel {
  // Index function for products

  async index(): Promise<product[] | string> {
    try {
      const conn: PoolClient = await client.connect(); //Starting DB connection
      const sql: string = "select * from product";
      const result: QueryResult = await conn.query(sql);
      conn.release(); // Release the connection
      return result.rows;
    } catch (err) {
      return `Could not find any products ${err}`;
    }
  }

  // create new product function

  async create(p: product): Promise<product | string> {
    try {
      const conn: PoolClient = await client.connect(); //Starting DB connection
      const sql: string =
        "insert into product (name, price, category) values ($1, $2, $3) returning *";
      const result: QueryResult = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release(); // Release DB connection

      return result.rows[0];
    } catch (err) {
      return `Something went wrong in creating product ${err}`;
    }
  }

  // Show a specific product function

  async show(p_id: number): Promise<product | string> {
      try {
        const conn: PoolClient = await client.connect(); // Starting DB connection
        const sql: string = "select * from product where product.id = $1";
        const result: QueryResult = await conn.query(sql, [p_id]);
        conn.release(); // Release the connection
        return result.rows[0];
      }
      catch (err) {
          return `Something went wrong in getting the product ${err}`
      }
  }

  async showByCategory(p_cat: string): Promise<product[] | string> {
    try {
      const conn: PoolClient = await client.connect(); // Starting DB connection
      const sql: string = "select * from product where product.category = $1";
      const result: QueryResult = await conn.query(sql, [p_cat]);
      conn.release(); // Release the connection
      return result.rows;
    }
    catch (err) {
      return `There is no products in this category ${err}`
    }
  }

  async delete(p_id: number): Promise<product | string> {
    try {
      const conn: PoolClient = await client.connect(); // Starting DB connection
      const sql: string = "delete from product where product.id = $1 returning *";
      const result: QueryResult = await conn.query(sql, [p_id]);
      conn.release(); // Release the connection
      return result.rows[0];
    }
    catch(err) {
      return `Something went wrong ${err}`
    }
  }
  
}
