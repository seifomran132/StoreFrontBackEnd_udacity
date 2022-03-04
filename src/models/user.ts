import client from "../database";
import user from "../types/user.type";

export class UsersModel {
  // Index function to get all users from database

  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = "select * from users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error("Something went wrong, can not return users");
    }
  }

  // Create function to insert user to database
  async create(u: user): Promise<user | string> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ]);
      conn.release();


      return result.rows[0];
    } catch (err) {
      console.log(err)

      return `User does not exist ${err}`;
    }
  }

  // Create function to insert user to database
  async show(u_id:number): Promise<user[] | string> {
    try {
      const conn = await client.connect();
      const sql = "select * from users where users.id = $1";
      const result = await conn.query(sql, [u_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      return `User does not exist ${err}`;
    }
  }
}
