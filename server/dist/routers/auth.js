"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieIsValid = cookieIsValid;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const lobby_1 = require("../code/lobby");
const router = express_1.default.Router();
function cookieIsValid(cookie) {
    return (cookie && cookie.user_session_id && cookie.username);
}
// Login router
router.post("/login", (req, res) => {
    // Filter requests with no/invalid username
    if (!req.body.username) {
        res.status(400).json({ message: "Please provide a username" });
        return;
    }
    if (req.body.username.length >= 20) {
        res.status(400).json({ message: "Username too long!" });
        return;
    }
    // Add Cookie
    const user_session_id = (0, uuid_1.v4)();
    res.cookie("username", req.body.username, { signed: true, domain: "" });
    res.cookie("user_session_id", user_session_id, { signed: true });
    // Join Lobby as Spectator
    (0, lobby_1.userJoin)(req.body.username, user_session_id);
    // Send response to client
    res.status(200).json({
        message: "Welcome",
    });
});
// For Client to check if they are authorized
router.get("/is_auth", (req, res) => {
    console.log("is_auth");
    console.log(req.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies);
    if (!cookieIsValid(req.signedCookies)) {
        res.status(200).send(false);
        return;
    }
    res.status(200).send(true);
});
// Check Authorization
router.all("/*", (req, res, next) => {
    if (!cookieIsValid(req.signedCookies)) {
        res.status(401).send("Unauthoized Access");
        return;
    }
    next();
});
exports.default = router;
