"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Importing Routers 
const auth_1 = __importDefault(require("./routers/auth"));
const websocket_1 = __importDefault(require("./code/websocket"));
dotenv.config();
const PORT = process.env.PORT ?? 3000;
// Initialize Web App
const app = (0, express_1.default)();
app.set('view engine', 'pug');
app.use((0, cors_1.default)()); // remove in production
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path.join(__dirname, '../build')));
app.get("/*", (req, res, next) => {
    console.log("============================================================");
    console.log(`GET_Request_url : ${req.url}`);
    console.log(`IP: ${req.ip}`);
    console.log("Request_body :");
    console.log(req.body);
    console.log("Signed_Cookies : ");
    console.log(req.signedCookies);
    console.log("============================================================");
    next();
});
app.post("/*", (req, res, next) => {
    console.log("============================================================");
    console.log(`POST_Request_url : ${req.url}`);
    console.log(`IP: ${req.ip}`);
    console.log("Request_body :");
    console.log(req.body);
    console.log("Signed_Cookies : ");
    console.log(req.signedCookies);
    console.log("============================================================");
    next();
});
// No Authorization Needed
app.get(['/', '/login'], (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// Auth Router includes check for authorization
app.use(auth_1.default);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// Launch Application
const server = app.listen(PORT, () => {
    console.log(`Backend Server Opened on Port : ${PORT}`);
});
(0, websocket_1.default)(server);
