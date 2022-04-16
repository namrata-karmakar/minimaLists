"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameValidationSchema = void 0;
const validation_messages_json_1 = require("../validation-messages.json");
const UsernameValidationSchema = {
    username: {
        in: ["params"],
        isEmail: true,
        normalizeEmail: {
            gmail_remove_dots: true,
        },
        errorMessage: validation_messages_json_1.INVALID_EMAIL_MESSAGE,
    },
};
exports.UsernameValidationSchema = UsernameValidationSchema;
//# sourceMappingURL=username-validation.js.map