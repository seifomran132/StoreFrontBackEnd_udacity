import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import UserRouter from "./handlers/user";
import productRouter from "./handlers/products";
import ordersRouter from "./handlers/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

// userRoute(app);

app.use("/user", UserRouter);
app.use("/product", productRouter);
app.use("/orders", ordersRouter)

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;