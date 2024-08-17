"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../code/lobby/index");
const router = express_1.default.Router();
router.get("/lobby_types", (req, res) => {
    res.status(200).json((0, index_1.getLobbyTypes)());
});
// API for creating lobby
router.post("/create_lobby", (req, res) => {
    if (!req.body || !req.body.lobby_name || !req.body.lobby_type_id)
        // Check if user is already in a lobby
        if ((0, index_1.playerIsInAnyLobby)(req.cookies._auth)) {
            res.status(400).send({ message: "You are already in a lobby!" });
        }
    // Create a lobby
    const lobby_id = (0, index_1.createLobby)(req.body.lobby_name, req.body.lobby_type_id);
    if (!lobby_id) {
        res.status(400).send({ message: "Lobby Type Id Not Found" });
    }
    // Return lobby code
    res.status(200).json({ message: "Lobby Successfully Created!", id: lobby_id });
});
exports.default = router;
