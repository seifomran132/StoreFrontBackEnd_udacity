import supertest from 'supertest';
import client from '../../database';
import { UsersModel } from '../../models/user';
import { user } from '../../types/user.type';
import app from '../../server';

const Supertest = supertest(app);
const userModel: UsersModel = new UsersModel();

let token = ''; // Will be asigned to the token value after creating user

describe('Test product endpoints', () => {
  const testUser: user = {
    firstname: 'seif',
    lastname: 'omran',
    password: 'test123',
  };
  beforeAll(async () => {
    const created = await userModel.create(testUser);
    token = Object(created)['token'];
    Object(created)['user'];
  });
  afterAll(async () => {
    await userModel.delete(1);

    const conn = await client.connect();
    const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE product_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });

  it('Should test create product endpoint', async () => {
    const response = await Supertest.post('/product/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'Test Product',
        price: 1000,
        category: 'Test Category',
      });
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Test Product');
    expect(response.body.price).toEqual(1000);
    expect(response.body.category).toEqual('Test Category');
  });

  it('Should test show product endpoint', async () => {
    const response = await Supertest.get('/product/show/:1').send({
      id: 1,
    });
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('Test Product');
    expect(response.body.price).toEqual(1000);
    expect(response.body.category).toEqual('Test Category');
  });
  it('Should test index products endpoint', async () => {
    const response = await Supertest.get('/product/index');
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });
  it('Should test get product by category endpoint', async () => {
    const response = await Supertest.get('/product/index/category').send({
      category: 'Test Category',
    });
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].category).toEqual('Test Category');
  });
  it('Should test get product by category endpoint', async () => {
    const response = await Supertest.get('/product/index/category').send({
      category: 'Test Category',
    });
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].category).toEqual('Test Category');
  });

  it('Should test delete product endpoint', async () => {
    const response = await Supertest.delete('/product/delete/:1')
      .set('Authorization', 'Bearer ' + token)
      .send({
        id: 1,
      });
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('product deleted');
  });
});
