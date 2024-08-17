"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyInstance = void 0;
const utils_1 = require("../utils");
class LobbyInstance {
    lobby_name;
    lobby_type_id;
    lobby_id;
    player_list;
    data;
    constructor(lobby_name, lobby_type_id) {
        this.lobby_name = lobby_name;
        this.lobby_type_id = lobby_type_id;
        this.lobby_id = (0, utils_1.randomText)(16);
        this.player_list = [];
        this.data = {};
    }
}
exports.LobbyInstance = LobbyInstance;
