"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 3012;
if (process.env.NODE_ENV === 'production') {
    app_1.app.use(express_1.default.static('minimaLists-frontend/dist'));
}
app_1.app.listen(port, () => {
    console.log(`listening at port ${port}`);
    console.log(`environment is ${process.env.NODE_ENV}`);
});
//# sourceMappingURL=server.js.map