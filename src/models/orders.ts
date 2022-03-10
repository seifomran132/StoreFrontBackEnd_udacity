import { PoolClient, QueryResult } from 'pg';
import client from '../database';
import order from '../types/order.type';

export class OrderModel {
  async getorders(u_id: number, completed = false): Promise<order[] | string> {
    try {
      const conn: PoolClient = await client.connect(); // Start DB Connection
      if (completed) {
        const sql = `select * from orders where user_id = $1 and orders.status = 'completed'`;
        const result: QueryResult = await conn.query(sql, [u_id]);
        conn.release(); // Release DB Connection
        return result.rows;
      }
      const sql = `select * from orders where user_id = $1`;
      const result: QueryResult = await conn.query(sql, [u_id]);
      conn.release(); // Release DB Connection

      return result.rows;
    } catch (err) {
      return `something went wrong in retrieving the order ${err}`;
    }
  }

  async createOrder(o: order): Promise<order | string> {
    try {
      const conn: PoolClient = await client.connect(); // Start DB Connection
      const sql = `INSERT INTO orders(product_id, user_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result: QueryResult = await conn.query(sql, [
        o.product_id,
        o.user_id,
        o.quantity,
        o.status,
      ]);
      conn.release(); // Release DB Connection
      return result.rows[0];
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  }

  async delete(o_id: number): Promise<order | string> {
    try {
      const conn: PoolClient = await client.connect(); // Starting DB connection
      const sql = 'delete from orders where orders.id = $1 returning *';
      const result: QueryResult = await conn.query(sql, [o_id]);
      conn.release(); // Release the connection
      return result.rows[0];
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  }
}
