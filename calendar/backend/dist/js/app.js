"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const HOST = process.env.BACKEND_HOST || "localhost";
const PORT = parseInt(process.env.BACKEND_PORT || "") || 4000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.static(__dirname + '/public'));
app.use(routes_1.default);
const uri = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority;`;
console.log(uri);
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`)))
    .catch(error => {
    throw error;
});
