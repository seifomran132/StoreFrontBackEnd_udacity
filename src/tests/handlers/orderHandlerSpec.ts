import supertest from "supertest";
import client from "../../database";
import { UsersModel } from "../../models/user";
import { user } from "../../types/user.type";
import { ProductModel } from "../../models/products";
import product from "../../types/product.type";
import app from "../../server";
import { OrderModel } from "../../models/orders";

const Supertest = supertest(app);
const userModel: UsersModel = new UsersModel();
const productModel: ProductModel = new ProductModel();
const orderModel: OrderModel = new OrderModel();

let token = ""; // Will be asigned to the token value after creating user
let createdUser: user; // Will be assigned to the created user details
let createdProduct: product | string;

describe("Test order endpoints", () => {
  const testUser: user = {
    firstname: "seif",
    lastname: "omran",
    password: "test123",
  };
  const testProduct: product = {
    name: "Test Prod",
    price: 1000,
    category: "Test Category",
  };
  beforeAll(async () => {
    const created = await userModel.create(testUser);
    createdProduct = await productModel.create(testProduct);
    token = Object(created)["token"];
    createdUser = Object(created)["user"];
    // console.log(createdUser, token)
  });
  afterAll(async () => {
    console.log("After All");
    await orderModel.delete(1);
    await productModel.delete(1);
    await userModel.delete(1);

    const conn = await client.connect();
    const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE product_id_seq RESTART WITH 1;ALTER SEQUENCE orders_id_seq RESTART WITH 1;`;
    await conn.query(sql);
    conn.release();
  });

  it("Should test create order fucntion", async () => {
    const response = await Supertest.post("/orders/create")
      .set("Authorization", "Bearer " + token)
      .send({
        product_id: 1,
        user_id: 1,
        quantity: 1,
        status: "completed",
      });

    expect(response.status).toEqual(200);
  });

  it("Should test get order fucntion", async () => {
    const response = await Supertest.get("/orders/:1")
      .set("Authorization", "Bearer " + token)
      .send({
        "user_id":1
      });

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].product_id).toEqual(1);
    expect(response.body[0].user_id).toEqual(1);
    expect(response.body[0].quantity).toEqual(1);
    expect(response.body[0].status).toEqual("completed");

  });
  it("Should test delete order fucntion", async () => {
    const response = await Supertest.delete("/orders/delete/:1")
      .set("Authorization", "Bearer " + token)
      .send({
        "id":1
      });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("order deleted");
    expect(response.body.userDetails.id).toEqual(1);
    expect(response.body.userDetails.product_id).toEqual(1);
    expect(response.body.userDetails.user_id).toEqual(1);
    expect(response.body.userDetails.quantity).toEqual(1);
    expect(response.body.userDetails.status).toEqual("completed");

  });
});
