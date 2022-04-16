/* eslint-disable consistent-return */
import { Request, Response, Router } from "express";
import { Database, InsertParams, ReadParams } from "../database";
import { SignUpSchema } from "../validations/signup-validations/signup-schema-validations";
import { SchemaMiddleware } from "../validations/schema-middleware";
import { UserAuthentication } from "../authentication/user-authentication";
import { JWTMiddleware } from "../middlewares/jwt-middleware";
import { LoginSchema } from "../validations/login-validations/login-schema-validations";
import { UsernameValidationSchema } from "../validations/login-validations/username-validation";
import { SchemaValidationErrorMiddleware } from "../middlewares/schema-validation-error-middleware";

class UserRouter {
  static getUserRouter(): Router {
    const router = Router();

    router.post(
      "/signUp",
      SchemaMiddleware.validate(SignUpSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req: Request, res: Response) => {
        let response = "";
        let status = 0;
        try {
          const insertOneParams: InsertParams = {
            data: req.body,
            collection: "userData",
          };
          const db: Database = new Database();
          response = await db.insertOne(insertOneParams);
          status = 201;
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      }
    );

    router.post(
      "/login",
      SchemaMiddleware.validate(LoginSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req, res) => {
        let response = {};
        let status = 0;
        try {
          const { username } = req.body;
          const { password } = req.body;
          const userData = await UserAuthentication.authenticateUser(
            username,
            password
          );
          if (userData && userData !== undefined ) {
            response = {
              token: JWTMiddleware.createToken(),
              userID: userData._id
            }
            status = 202;
          } else {
            response = "Invalid Credentials";
            status = 401;
          }
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      }
    );

    router.get(
      "/username/:username",
      SchemaMiddleware.validate(UsernameValidationSchema),
      SchemaValidationErrorMiddleware.validate,
      async (req, res) => {
        let response;
        let status = 0;
        try {
          const { username } = req.params;
          const readOneParams: ReadParams = {
            query: { username },
            options: { projection: { _id: 1 } },
            collection: "userData",
          };
          const db: Database = new Database();
          const dataFromDB = await db.readOne(readOneParams);
          if (dataFromDB !== null) {
            response = dataFromDB._id;
            status = 200;
          } else {
            response = `${username} not found!`;
            status = 404;
          }
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      }
    );

    return router;
  }
}

export { UserRouter };
