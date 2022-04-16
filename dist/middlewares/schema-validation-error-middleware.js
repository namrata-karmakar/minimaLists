"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidationErrorMiddleware = void 0;
const express_validator_1 = require("express-validator");
class SchemaValidationErrorMiddleware {
    static validate(req, res, next) {
        const errors = express_validator_1.validationResult(req);
        if (errors.isEmpty() === false) {
            res.status(400).json({ errors: errors.array() });
        }
        else {
            next();
        }
    }
}
exports.SchemaValidationErrorMiddleware = SchemaValidationErrorMiddleware;
//# sourceMappingURL=schema-validation-error-middleware.js.map