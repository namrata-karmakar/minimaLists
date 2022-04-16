/* eslint-disable @typescript-eslint/naming-convention */
import { Router, Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import { Database, InsertParams, ReadParams } from '../database';
import { SchemaValidationErrorMiddleware } from '../middlewares/schema-validation-error-middleware';
import { SchemaMiddleware } from '../validations/schema-middleware';
import { PostToDoSchema } from '../validations/todo-validations/post-todo-schema-validations';
import {
  GetToDoByUserIDSchema,
  GetToDoByIDSchema,
} from '../validations/todo-validations/get-todo-schema-validations';
import { UpdateToDoByIDSchema } from '../validations/todo-validations/update-todo-schema-validations';
import { DeleteToDoByIDSchema } from '../validations/todo-validations/delete-todo-schema-validations';

class ToDoRouter {
  static getToDoRouter(): Router {
    const router = Router();

    router.post(
      '/',
      SchemaMiddleware.validate(PostToDoSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req: Request, res: Response) => {
        let response = '';
        let status = 0;
        try {
          const data = req.body;
          const insertOneParams: InsertParams = {
            data,
            collection: 'userToDoData',
          };
          const db = new Database();
          response = await db.insertOne(insertOneParams);
          status = 201;
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      },
    );

    router.get(
      '/user/:userID',
      SchemaMiddleware.validate(GetToDoByUserIDSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req: Request, res: Response) => {
        let response = '';
        let status = 0;
        const { userID } = req.params;
        try {
          const readParams: ReadParams = {
            query: { userID },
            options: {},
            collection: 'userToDoData',
          };
          const db = new Database();
          response = await db.read(readParams);
          status = 200;
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      },
    );

    router.get(
      '/id/:id',
      SchemaMiddleware.validate(GetToDoByIDSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req: Request, res: Response) => {
        let response;
        let status = 0;
        const _id = ObjectID.createFromHexString(req.params.id);
        try {
          const readOneParams: ReadParams = {
            query: { _id },
            options: {},
            collection: 'userToDoData',
          };
          const db = new Database();
          response = await db.readOne(readOneParams);
          status = 200;
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      },
    );

    router.put(
      '/id/:id',
      SchemaMiddleware.validate(UpdateToDoByIDSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req: Request, res: Response) => {
        let response = '';
        let status = 0;
        const _id = ObjectID.createFromHexString(req.params.id);
        try {
          const data = req.body;
          const updateOneParams = {
            filter: { _id },
            update: { $set: { ...data } },
            options: {},
            collection: 'userToDoData',
          };
          const db = new Database();
          response = await db.updateOne(updateOneParams);
          status = 200;
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      },
    );

    router.delete(
      '/id/:id',
      SchemaMiddleware.validate(DeleteToDoByIDSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req, res) => {
        let response = '';
        let status = 0;
        const _id = ObjectID.createFromHexString(req.params.id);
        try {
          const deleteOneParams = {
            filter: { _id },
            options: {},
            collection: 'userToDoData',
          };
          const db = new Database();
          response = await db.deleteOne(deleteOneParams);
          status = 200;
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      },
    );

    return router;
  }
}

export { ToDoRouter };
