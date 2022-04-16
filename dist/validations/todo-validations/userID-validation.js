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
exports.UserIDValidation = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("../../database");
class UserIDValidation {
    static validate(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const _id = mongodb_1.ObjectID.createFromHexString(userID);
                const countParams = {
                    query: { _id },
                    options: {},
                    collection: 'userData',
                };
                const db = new database_1.Database();
                const count = yield db.countDocuments(countParams);
                return count;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.UserIDValidation = UserIDValidation;
//# sourceMappingURL=userID-validation.js.map