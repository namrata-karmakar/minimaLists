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
exports.SignUpSchema = void 0;
const validation_messages_json_1 = require("../validation-messages.json");
const unique_email_validation_1 = require("./unique-email-validation");
const dob_validation_1 = require("./dob-validation");
const SignUpSchema = {
    username: {
        in: ['body'],
        isEmail: true,
        errorMessage: validation_messages_json_1.INVALID_EMAIL_MESSAGE,
        normalizeEmail: {
            gmail_remove_dots: true,
        },
        custom: {
            options: (username) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield unique_email_validation_1.UniqueEmailValidation.validateEmail(username);
                }
                catch (e) {
                    throw e;
                }
            }),
        },
    },
    password: {
        in: ['body'],
        isStrongPassword: true,
        errorMessage: validation_messages_json_1.INVALID_PASSWORD_MESSAGE,
    },
    dob: {
        in: ['body'],
        custom: {
            options: (dob) => new Date(dob) <= new Date(dob_validation_1.DOBValidation.getMinimumDOB()),
        },
        errorMessage: validation_messages_json_1.AGE_ERROR_MESSAGE,
    },
    tnc: {
        in: ['body'],
        isBoolean: true,
        custom: {
            options: (tnc) => tnc === true,
        },
        errorMessage: validation_messages_json_1.TNC_ERROR_MESSAGE,
    },
};
exports.SignUpSchema = SignUpSchema;
//# sourceMappingURL=signup-schema-validations.js.map