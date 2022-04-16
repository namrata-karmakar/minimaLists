"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTMiddleware {
    static createToken() {
        return jsonwebtoken_1.default.sign({}, process.env.SECRET_STRING || "abcpqr", {
            expiresIn: '999h',
        });
    }
    static verifyToken(req, res, next) {
        const jwt = req.headers['x-token-header'];
        if (!jwt) {
            res.status(403).send({ message: 'No token provided!' });
        }
        else {
            jsonwebtoken_1.default.verify(jwt, process.env.SECRET_STRING || "abcpqr", (err) => {
                if (err) {
                    res.status(403).send(err);
                }
                else {
                    next();
                }
            });
        }
    }
}
exports.JWTMiddleware = JWTMiddleware;
//# sourceMappingURL=jwt-middleware.js.map