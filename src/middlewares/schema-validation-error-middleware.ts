import { validationResult, Result, ValidationError } from 'express-validator';

class SchemaValidationErrorMiddleware {
  static validate(req, res, next) {
    const errors: Result<ValidationError> = validationResult(req);
    if (errors.isEmpty() === false) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  }
}

export { SchemaValidationErrorMiddleware };
