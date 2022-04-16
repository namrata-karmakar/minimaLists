import express from "express";
import { UserRouter } from "./routers/user-router";
import { ToDoRouter } from "./routers/todo-router";
import { JWTMiddleware } from "./middlewares/jwt-middleware";
import cors from "cors";

const app = express();
app.use(express.json());

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'x-token-header',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));

app.get("/isAlive", async (req, res) => {
	res.status(200).send();
});

app.all("/api/*", JWTMiddleware.verifyToken);

app.use("/user", UserRouter.getUserRouter());
app.use("/api/user", UserRouter.getUserRouter());
app.use("/api/todo", ToDoRouter.getToDoRouter());

export { app };
