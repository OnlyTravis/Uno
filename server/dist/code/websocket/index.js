"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureWebsocket;
const ws_1 = require("ws");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("../../routers/auth");
function configureWebsocket(server) {
    const wss = new ws_1.WebSocketServer({ noServer: true });
    // Handle upgrade event
    server.on("upgrade", (req, socket, head) => {
        (0, cookie_parser_1.default)(process.env.COOKIE_SECRET)(req, {}, () => {
            const signed_cookies = req.signedCookies;
            console.log("upgrade");
            console.log(signed_cookies);
            // Destroy Connection if user is not logged in
            if (!(0, auth_1.cookieIsValid)(signed_cookies)) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
            }
            // Connect Websocket
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit('connection', ws, req);
            });
        });
    });
    // Handle Websocket connection stuff
    wss.on("connection", (ws) => {
        ws.on("message", (data, is_binary) => {
            console.log("-------------------------");
            console.log("Received Websocket Message:");
            console.log(data.toString());
            console.log(is_binary);
            console.log("-------------------------");
        });
    });
}
