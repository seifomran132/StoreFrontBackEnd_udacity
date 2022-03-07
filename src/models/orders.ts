import { PoolClient, QueryResult } from "pg";
import client from "../database";
import order from "../types/order.type";

export class OrderModel {

    async getorders(u_id: number, completed: boolean = false): Promise<order[] | string> {
        try {
            const conn: PoolClient = await client.connect() // Start DB Connection
            if(completed){
                const sql: string = `select * from orders where user_id = $1 and orders.status = 'completed'`;
                const result: QueryResult = await conn.query(sql, [u_id]);
                conn.release() // Release DB Connection
                return result.rows
            }
            const sql: string = `select * from orders where user_id = $1`;
            const result: QueryResult = await conn.query(sql, [u_id]);
            conn.release() // Release DB Connection


            return result.rows
        }
        catch (err) {
            console.log(err)
            return `something went wrong in retrieving the order ${err}`
        }
    }


}