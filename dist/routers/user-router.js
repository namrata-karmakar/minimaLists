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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
/* eslint-disable consistent-return */
const express_1 = require("express");
const database_1 = require("../database");
const signup_schema_validations_1 = require("../validations/signup-validations/signup-schema-validations");
const schema_middleware_1 = require("../validations/schema-middleware");
const user_authentication_1 = require("../authentication/user-authentication");
const jwt_middleware_1 = require("../middlewares/jwt-middleware");
const login_schema_validations_1 = require("../validations/login-validations/login-schema-validations");
const username_validation_1 = require("../validations/login-validations/username-validation");
const schema_validation_error_middleware_1 = require("../middlewares/schema-validation-error-middleware");
class UserRouter {
    static getUserRouter() {
        const router = express_1.Router();
        router.post("/signUp", schema_middleware_1.SchemaMiddleware.validate(signup_schema_validations_1.SignUpSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response = "";
            let status = 0;
            try {
                const insertOneParams = {
                    data: req.body,
                    collection: "userData",
                };
                const db = new database_1.Database();
                response = yield db.insertOne(insertOneParams);
                status = 201;
            }
            catch (e) {
                console.error(`[ERROR] ${e.message}-${e.stack}`);
                response = e.message;
                status = 500;
            }
            finally {
                res.status(status).send(response);
            }
        }));
        router.post("/login", schema_middleware_1.SchemaMiddleware.validate(login_schema_validations_1.LoginSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response = {};
            let status = 0;
            try {
                const { username } = req.body;
                const { password } = req.body;
                const userData = yield user_authentication_1.UserAuthentication.authenticateUser(username, password);
                if (userData && userData !== undefined) {
                    response = {
                        token: jwt_middleware_1.JWTMiddleware.createToken(),
                        userID: userData._id
                    };
                    status = 202;
                }
                else {
                    response = "Invalid Credentials";
                    status = 401;
                }
            }
            catch (e) {
                console.error(`[ERROR] ${e.message}-${e.stack}`);
                response = e.message;
                status = 500;
            }
            finally {
                res.status(status).send(response);
            }
        }));
        router.get("/username/:username", schema_middleware_1.SchemaMiddleware.validate(username_validation_1.UsernameValidationSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response;
            let status = 0;
            try {
                const { username } = req.params;
                const readOneParams = {
                    query: { username },
                    options: { projection: { _id: 1 } },
                    collection: "userData",
                };
                const db = new database_1.Database();
                const dataFromDB = yield db.readOne(readOneParams);
                if (dataFromDB !== null) {
                    response = dataFromDB._id;
                    status = 200;
                }
                else {
                    response = `${username} not found!`;
                    status = 404;
                }
            }
            catch (e) {
                console.error(`[ERROR] ${e.message}-${e.stack}`);
                response = e.message;
                status = 500;
            }
            finally {
                res.status(status).send(response);
            }
        }));
        return router;
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=user-router.js.map