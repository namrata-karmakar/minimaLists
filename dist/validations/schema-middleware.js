"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaMiddleware = void 0;
const express_validator_1 = require("express-validator");
class SchemaMiddleware {
    static validate(schema) {
        return express_validator_1.checkSchema(schema);
    }
}
exports.SchemaMiddleware = SchemaMiddleware;
//# sourceMappingURL=schema-middleware.js.map