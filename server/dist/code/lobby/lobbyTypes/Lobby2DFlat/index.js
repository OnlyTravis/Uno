"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lobby_1 = require("../../lobby");
class Lobby2DFlat extends lobby_1.LobbyInstance {
    constructor(lobby_name, lobby_type_id) {
        // Lobby Instance Constructor
        super(lobby_name, lobby_type_id);
        // Initialize different lobby types
        switch (lobby_type_id) {
            case 1:
                break;
        }
    }
    addPlayer(username, jwt) {
    }
}
exports.default = Lobby2DFlat;
