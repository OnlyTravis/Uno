"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const mountRouter = () => {
    router.ws('/echo', function (ws, req) {
        ws.on('message', function (msg) {
            ws.send(msg);
        });
    });
};
exports.mountRouter = mountRouter;
exports.default = router;
