import { PoolClient, QueryResult } from 'pg';
import client from '../database';
import order from '../types/order.type';

export class OrderModel {
  async getorders(u_id: number, completed = false): Promise<order[] | string> {
    try {
      const conn: PoolClient = await client.connect(); // Start DB Connection
      if (completed) {
        const sql = `select * from orders JOIN order_product ON orders.id = order_product.order_id where orders.user_id = $1; and orders.status = 'completed'`;
        const result: QueryResult = await conn.query(sql, [u_id]);
        conn.release(); // Release DB Connection
        return result.rows;
      }
      const sql = `select * from orders JOIN order_product ON orders.id = order_product.order_id where orders.user_id = $1;`;
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
      const sql1 = `INSERT INTO orders(user_id, status) VALUES ($1, $2) RETURNING *`;
      const sql2 = `INSERT INTO order_product(product_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *`
      const result1: QueryResult = await conn.query(sql1, [
        o.user_id,
        o.status,        
      ]);
      

      const result2: QueryResult = await conn.query(sql2, [o.product_id, result1.rows[0].id, o.quantity])
      conn.release(); // Release DB Connection


      const createdOrder: order = {
        user_id: result1.rows[0].user_id,
        product_id: result2.rows[0].product_id,
        quantity: result2.rows[0].quantity,
        status: result1.rows[0].status,

      }
      return createdOrder;
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  }

  async delete(o_id: number): Promise<order | string> {
    try {
      const conn: PoolClient = await client.connect(); // Starting DB connection
      const sql1 = 'delete from order_product where order_product.order_id = $1 returning *';
      const sql2 = 'delete from orders where orders.id = $1 returning *';
      const result2: QueryResult = await conn.query(sql1, [o_id]);
      const result1: QueryResult = await conn.query(sql2, [o_id]);


      const deletedOrder: order = {
        user_id: result1.rows[0].user_id,
        product_id: result2.rows[0].product_id,
        quantity: result2.rows[0].quantity,
        status: result1.rows[0].status,
      }


      conn.release(); // Release the connection
      return deletedOrder;
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  }
}
