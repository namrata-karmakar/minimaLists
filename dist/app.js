"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user-router");
const todo_router_1 = require("./routers/todo-router");
const jwt_middleware_1 = require("./middlewares/jwt-middleware");
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
const options = {
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
app.use(cors_1.default(options));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World");
}));
app.get("/isAlive", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send();
}));
app.all("/api/*", jwt_middleware_1.JWTMiddleware.verifyToken);
app.use("/user", user_router_1.UserRouter.getUserRouter());
app.use("/api/user", user_router_1.UserRouter.getUserRouter());
app.use("/api/todo", todo_router_1.ToDoRouter.getToDoRouter());
//# sourceMappingURL=app.js.map