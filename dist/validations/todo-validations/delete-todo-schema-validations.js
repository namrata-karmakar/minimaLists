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
exports.DeleteToDoByIDSchema = void 0;
const validation_messages_json_1 = require("../validation-messages.json");
const id_validation_1 = require("../id-validation");
const DeleteToDoByIDSchema = {
    id: {
        in: ['params'],
        isLength: {
            options: { min: 1, max: 1000 },
        },
        isHexadecimal: true,
        isMongoId: true,
        custom: {
            options: (id) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const count = yield id_validation_1.IDValidation.validate(id);
                    if (count === 0)
                        throw new Error(validation_messages_json_1.INVALID_ID_MESSAGE);
                }
                catch (e) {
                    throw e;
                }
            }),
        },
        errorMessage: validation_messages_json_1.INVALID_ID_MESSAGE,
    },
};
exports.DeleteToDoByIDSchema = DeleteToDoByIDSchema;
//# sourceMappingURL=delete-todo-schema-validations.js.map