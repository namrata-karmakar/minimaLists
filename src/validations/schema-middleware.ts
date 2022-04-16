import { checkSchema } from 'express-validator';

class SchemaMiddleware {
  static validate(schema) {
    return checkSchema(schema);
  }
}

export { SchemaMiddleware };
