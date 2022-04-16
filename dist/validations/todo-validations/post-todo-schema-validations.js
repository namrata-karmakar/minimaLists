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
exports.PostToDoSchema = void 0;
const validation_messages_json_1 = require("../validation-messages.json");
const userID_validation_1 = require("./userID-validation");
const PostToDoSchema = {
    todo: {
        in: ['body'],
        isLength: {
            options: { min: 3, max: 1000 },
        },
        errorMessage: validation_messages_json_1.INVALID_TODO_MESSAGE,
    },
    status: {
        in: ['body'],
        custom: {
            options: (status) => ['Done', 'In Progress', 'Not Started'].indexOf(status) >= 0,
        },
        errorMessage: validation_messages_json_1.INVALID_STATUS_MESSAGE,
    },
    userID: {
        in: ['body'],
        isLength: {
            options: { min: 1, max: 1000 },
        },
        isHexadecimal: true,
        isMongoId: true,
        custom: {
            options: (userID) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const count = yield userID_validation_1.UserIDValidation.validate(userID);
                    if (count === 0)
                        throw new Error(validation_messages_json_1.INVALID_USERID_MESSAGE);
                }
                catch (e) {
                    throw e;
                }
            }),
        },
        errorMessage: validation_messages_json_1.INVALID_USERID_MESSAGE,
    },
    createdOn: {
        in: ['body'],
        isISO8601: true,
        errorMessage: validation_messages_json_1.INVALID_CREATEDON_MESSAGE,
    },
};
exports.PostToDoSchema = PostToDoSchema;
//# sourceMappingURL=post-todo-schema-validations.js.map