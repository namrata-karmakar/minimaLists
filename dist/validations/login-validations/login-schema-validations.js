"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const validation_messages_json_1 = require("../validation-messages.json");
const LoginSchema = {
    username: {
        in: ["body"],
        isEmail: true,
        errorMessage: validation_messages_json_1.INVALID_EMAIL_MESSAGE,
        normalizeEmail: {
            gmail_remove_dots: true,
        },
    },
    password: {
        in: ["body"],
        isStrongPassword: true,
        errorMessage: validation_messages_json_1.INVALID_PASSWORD_MESSAGE,
    },
};
exports.LoginSchema = LoginSchema;
//# sourceMappingURL=login-schema-validations.js.map