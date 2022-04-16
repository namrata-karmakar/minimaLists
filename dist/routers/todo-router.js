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
exports.ToDoRouter = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const database_1 = require("../database");
const schema_validation_error_middleware_1 = require("../middlewares/schema-validation-error-middleware");
const schema_middleware_1 = require("../validations/schema-middleware");
const post_todo_schema_validations_1 = require("../validations/todo-validations/post-todo-schema-validations");
const get_todo_schema_validations_1 = require("../validations/todo-validations/get-todo-schema-validations");
const update_todo_schema_validations_1 = require("../validations/todo-validations/update-todo-schema-validations");
const delete_todo_schema_validations_1 = require("../validations/todo-validations/delete-todo-schema-validations");
class ToDoRouter {
    static getToDoRouter() {
        const router = express_1.Router();
        router.post('/', schema_middleware_1.SchemaMiddleware.validate(post_todo_schema_validations_1.PostToDoSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response = '';
            let status = 0;
            try {
                const data = req.body;
                const insertOneParams = {
                    data,
                    collection: 'userToDoData',
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
        router.get('/user/:userID', schema_middleware_1.SchemaMiddleware.validate(get_todo_schema_validations_1.GetToDoByUserIDSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response = '';
            let status = 0;
            const { userID } = req.params;
            try {
                const readParams = {
                    query: { userID },
                    options: {},
                    collection: 'userToDoData',
                };
                const db = new database_1.Database();
                response = yield db.read(readParams);
                status = 200;
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
        router.get('/id/:id', schema_middleware_1.SchemaMiddleware.validate(get_todo_schema_validations_1.GetToDoByIDSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response;
            let status = 0;
            const _id = mongodb_1.ObjectID.createFromHexString(req.params.id);
            try {
                const readOneParams = {
                    query: { _id },
                    options: {},
                    collection: 'userToDoData',
                };
                const db = new database_1.Database();
                response = yield db.readOne(readOneParams);
                status = 200;
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
        router.put('/id/:id', schema_middleware_1.SchemaMiddleware.validate(update_todo_schema_validations_1.UpdateToDoByIDSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response = '';
            let status = 0;
            const _id = mongodb_1.ObjectID.createFromHexString(req.params.id);
            try {
                const data = req.body;
                const updateOneParams = {
                    filter: { _id },
                    update: { $set: Object.assign({}, data) },
                    options: {},
                    collection: 'userToDoData',
                };
                const db = new database_1.Database();
                response = yield db.updateOne(updateOneParams);
                status = 200;
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
        router.delete('/id/:id', schema_middleware_1.SchemaMiddleware.validate(delete_todo_schema_validations_1.DeleteToDoByIDSchema), schema_validation_error_middleware_1.SchemaValidationErrorMiddleware.validate, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let response = '';
            let status = 0;
            const _id = mongodb_1.ObjectID.createFromHexString(req.params.id);
            try {
                const deleteOneParams = {
                    filter: { _id },
                    options: {},
                    collection: 'userToDoData',
                };
                const db = new database_1.Database();
                response = yield db.deleteOne(deleteOneParams);
                status = 200;
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
exports.ToDoRouter = ToDoRouter;
//# sourceMappingURL=todo-router.js.map