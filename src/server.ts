import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoute from "./handlers/user";
import productRouter from "./handlers/products";


const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

userRoute(app);
productRouter(app);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
