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
exports.Database = void 0;
const mongodb_1 = require("mongodb");
class Database {
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new mongodb_1.MongoClient(process.env.DB_URL || "mongodb://localhost:27017", {
                    useUnifiedTopology: true,
                });
                const connection = yield client.connect();
                return connection;
            }
            catch (e) {
                throw e;
            }
        });
    }
    dropDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.getConnection();
                const db = client.db(process.env.DB_NAME || "toDoDev");
                yield db.dropDatabase();
            }
            catch (e) {
                console.error(`${e.message}-${e.stack}`);
                throw e;
            }
            finally {
                client.close();
            }
        });
    }
    insertOne(insertOneParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.getConnection();
                const db = client.db(process.env.DB_NAME || "toDoDev");
                const collection = db.collection(insertOneParams.collection);
                const data = yield collection.insertOne(insertOneParams.data);
                return data;
            }
            catch (e) {
                throw e;
            }
            finally {
                client.close();
            }
        });
    }
    countDocuments(countParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.getConnection();
                const db = client.db(process.env.DB_NAME || "toDoDev");
                const collection = db.collection(countParams.collection);
                const data = yield collection.countDocuments(countParams.query, countParams.options);
                return data;
            }
            catch (e) {
                throw e;
            }
            finally {
                client.close();
            }
        });
    }
    read(readParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.getConnection();
                const db = client.db(process.env.DB_NAME || "toDoDev");
                const collection = db.collection(readParams.collection);
                const data = yield collection
                    .find(readParams.query, readParams.options)
                    .toArray();
                return data;
            }
            catch (e) {
                throw e;
            }
            finally {
                client.close();
            }
        });
    }
    readOne(readOneParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.getConnection();
                const db = client.db(process.env.DB_NAME || "toDoDev");
                const collection = db.collection(readOneParams.collection);
                const data = yield collection.findOne(readOneParams.query, readOneParams.options);
                return data;
            }
            catch (e) {
                throw e;
            }
            finally {
                client.close();
            }
        });
    }
    updateOne(updateOneParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.getConnection();
                const db = client.db(process.env.DB_NAME || "toDoDev");
                const collection = db.collection(updateOneParams.collection);
                const data = yield collection.updateOne(updateOneParams.filter, updateOneParams.update, updateOneParams.options);
                return data;
            }
            catch (e) {
                throw e;
            }
            finally {
                client.close();
            }
        });
    }
    deleteOne(deleteOneParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.getConnection();
                const db = client.db(process.env.DB_NAME || "toDoDev");
                const collection = db.collection(deleteOneParams.collection);
                const data = yield collection.deleteOne(deleteOneParams.filter, deleteOneParams.options);
                return data;
            }
            catch (e) {
                throw e;
            }
            finally {
                client.close();
            }
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map