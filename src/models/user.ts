import client from "../database";
import user from "../types/user.type";
import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken';

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const salt: string | undefined = process.env.SALT_ROUNDS;

export class UsersModel {
  // Index function to get all users from database

  async index(): Promise<user[]> {
    try {
      const conn = await client.connect(); //Starting DB connection
      const sql = "select * from users";
      const result = await conn.query(sql);
      conn.release(); // Release the connection
      return result.rows;
    } catch (err) {
      throw new Error("Something went wrong, can not return users");
    }
  }

  // Create function to insert user to database
  async create(u: user): Promise<any> {
    try {
      const conn = await client.connect(); // Starting DB connection
      const sql =
        "INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";

      const hashed: string = bcrypt.hashSync(
        u.password + pepper,
        parseInt(salt as string)
      );

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashed,
      ]);
      conn.release(); // Release the connection

      const token = jsonwebtoken.sign(result.rows[0], process.env.TOKEN as string);
      

      return {user: result.rows[0], token: token};
    } catch (err) {
      console.log(err);

      return `User does not exist ${err}`;
    }
  }

  // Create function to insert user to database
  async show(u_id: number): Promise<user[] | string> {
    try {
      const conn = await client.connect(); // Starting DB connection
      const sql = "select * from users where users.id = $1";
      const result = await conn.query(sql, [u_id]);
      conn.release(); // Release the connection
      return result.rows[0];
    } catch (err) {
      return `User does not exist ${err}`;
    }
  }
}