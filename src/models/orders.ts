import client from "../database";
import order from "../types/order.type";

export class OrderModel {

    async getorders(u_id: number, completed: boolean = false): Promise<order[] | string> {
        try {
            const conn = await client.connect() // Start DB Connection
            if(completed){
                const sql = `select * from orders where user_id = $1 and orders.status = 'completed'`;
                const result = await conn.query(sql, [u_id]);
                console.log("inside if")

                return result.rows
            }
            const sql = `select * from orders where user_id = $1`;
            const result = await conn.query(sql, [u_id]);
            console.log("outside")

            return result.rows
        }
        catch (err) {
            console.log(err)
            return `something went wrong in retrieving the order ${err}`
        }
    }


}