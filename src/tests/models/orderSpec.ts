import client from "../../database";
import { OrderModel } from "../../models/orders";
import { ProductModel } from "../../models/products";
import { UsersModel } from "../../models/user";
import order from "../../types/order.type";
import product from "../../types/product.type";
import { user } from "../../types/user.type";

const orderModel = new OrderModel;
const productModel = new ProductModel;
const userModel = new UsersModel;

describe("Test Order Model Functionality", ()=>{
    beforeAll(async ()=>{

        const ourUser: user = {
            firstname: "Seif",
            lastname: "Omran",
            password: "s123"
        }
        const ourProduct:product = {
            name : "Prod 1",
            price: 100,
            category: "Cat 1"
        }
        const createdUser = await userModel.create(ourUser)
        const createdProduct = await productModel.create(ourProduct)

    })
    afterAll(async()=>{

        await orderModel.delete(1)
        await productModel.delete(1)
        await userModel.delete(1)


        const conn = await client.connect();
        const sql = `ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE product_id_seq RESTART WITH 1;`
        await conn.query(sql);
        conn.release()
        
    })
    it("Should contain get order function", ()=>{
        expect(orderModel.getorders).toBeDefined();
    })
    it("Should contain create order function", ()=>{
        expect(orderModel.createOrder).toBeDefined();
    })
    it("Should create a new order", async ()=>{
        const ourOrder:order = {
            user_id: 1,
            product_id: 1,
            quantity: 1,
            status: "completed"
        }
        const createdOrder = await orderModel.createOrder(ourOrder);
        expect(Object(createdOrder)["user_id"]).toBeTruthy();
        expect(Object(createdOrder)["product_id"]).toBeTruthy();
        expect(Object(createdOrder)["quantity"]).toBeTruthy();
        expect(Object(createdOrder)["status"]).toBeTruthy();

    })

    it("Should get order", async ()=>{
        const ourOrder = await orderModel.getorders(1);
        expect(Object(ourOrder[0])["user_id"]).toEqual(1);
        expect(Object(ourOrder[0])["product_id"]).toEqual(1);
        expect(Object(ourOrder[0])["quantity"]).toEqual(1);
        expect(Object(ourOrder[0])["status"]).toEqual("completed");
    })

    it("Should delete order", async ()=>{
        const deletedOrder = await orderModel.delete(1);
        expect(Object(deletedOrder)["user_id"]).toEqual(1);
        expect(Object(deletedOrder)["product_id"]).toEqual(1);
        expect(Object(deletedOrder)["quantity"]).toEqual(1);
        expect(Object(deletedOrder)["status"]).toEqual("completed");
    })

    
    
})