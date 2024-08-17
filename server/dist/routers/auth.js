"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sessions_1 = require("../code/sessions");
const lobby_1 = require("../code/lobby");
const router = express_1.default.Router();
// Login router
router.post("/auth", (req, res) => {
    // Filter requests with no/invalid username
    if (!req.body.username) {
        res.status(400).json({ message: "Please provide a username" });
        return;
    }
    if (req.body.username.length >= 20) {
        res.status(400).json({ message: "Username too long!" });
        return;
    }
    // Signing login info with secret in .env
    const jwt_token = jsonwebtoken_1.default.sign(req.body.username, process.env.SECRET);
    // Join Lobby as Spectator
    (0, lobby_1.userJoin)(req.body.username, jwt_token);
    // Create Session + Send response to client
    (0, sessions_1.createSession)(req.body.username, jwt_token);
    res.status(200).json({
        message: "Welcome",
        token: jwt_token
    });
});
// Check Authorization
router.all("/*", (req, res, next) => {
    if (!req.cookies || !req.cookies._auth) {
        res.status(401).send("Unauthoized Access");
        return;
    }
    const username = jsonwebtoken_1.default.verify(req.cookies._auth, process.env.SECRET);
    if (username === JSON.parse(req.cookies._auth_state).username)
        next();
});
exports.default = router;
