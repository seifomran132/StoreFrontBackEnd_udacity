import client from '../database';
import { user, createdUser } from '../types/user.type';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { PoolClient, QueryResult } from 'pg';

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const salt: string | undefined = process.env.SALT_ROUNDS;

export class UsersModel {
  // Index function to get all users from database

  async index(): Promise<user[]> {
    try {
      const conn: PoolClient = await client.connect(); //Starting DB connection
      const sql = 'select * from users';
      const result: QueryResult = await conn.query(sql);
      conn.release(); // Release the connection
      return result.rows;
    } catch (err) {
      throw new Error('Something went wrong, can not return users');
    }
  }

  // Create function to insert user to database
  async create(u: user): Promise<createdUser | string> {
    try {
      const conn: PoolClient = await client.connect(); // Starting DB connection
      const sql =
        'INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';

      const hashed: string = bcrypt.hashSync(
        u.password + pepper,
        parseInt(salt as string)
      );

      const result: QueryResult = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashed,
      ]);
      conn.release(); // Release the connection

      const token = jsonwebtoken.sign(
        result.rows[0],
        process.env.TOKEN as string
      );

      return { user: result.rows[0], token: token };
    } catch (err) {
      return `User does not exist ${err}`;
    }
  }

  // Create function to insert user to database
  async show(u_id: number): Promise<user | string> {
    try {
      const conn: PoolClient = await client.connect(); // Starting DB connection
      const sql = 'select * from users where users.id = $1';
      const result: QueryResult = await conn.query(sql, [u_id]);
      conn.release(); // Release the connection
      return result.rows[0];
    } catch (err) {
      return `User does not exist ${err}`;
    }
  }

  async delete(u_id: number): Promise<user | string> {
    try {
      const conn: PoolClient = await client.connect(); // Starting DB connection
      const sql = 'delete from users where users.id = $1 returning *';
      const result: QueryResult = await conn.query(sql, [u_id]);
      conn.release(); // Release the connection
      return result.rows[0];
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  }
}
