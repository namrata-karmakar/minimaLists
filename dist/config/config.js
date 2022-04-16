"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const convict_1 = __importDefault(require("convict"));
const config = convict_1.default({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3012,
        env: "PORT",
    },
    dbURL: {
        doc: "Database connection string",
        format: String,
        default: "mongodb://localhost:27017",
        env: "DB_URL",
    },
    dbName: {
        doc: "Database name",
        format: String,
        default: "toDoDev",
        env: "DB_NAME",
    },
    secretString: {
        doc: "JWT Secret String",
        format: String,
        default: "mYsEcReT",
        env: "SECRET_STRING",
    },
});
exports.config = config;
// Load environment dependent configuration
const env = config.get("env");
config.loadFile(`${__dirname}/${env}.json`);
// Perform validation
config.validate({ allowed: "strict" });
//# sourceMappingURL=config.js.map