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
exports.UserAuthentication = void 0;
const database_1 = require("../database");
class UserAuthentication {
    static authenticateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readOneParams = {
                    query: { username, password },
                    options: {},
                    collection: 'userData',
                };
                const db = new database_1.Database();
                const userData = yield db.readOne(readOneParams);
                return userData;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.UserAuthentication = UserAuthentication;
//# sourceMappingURL=user-authentication.js.map