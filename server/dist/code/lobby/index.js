"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spectatorJoinPlayer = exports.userJoin = void 0;
var GameType;
(function (GameType) {
    GameType[GameType["NORMAL_UNO"] = 0] = "NORMAL_UNO";
})(GameType || (GameType = {}));
var GameState;
(function (GameState) {
    GameState[GameState["SETTING_UP"] = 0] = "SETTING_UP";
    GameState[GameState["PLAYING"] = 1] = "PLAYING";
})(GameState || (GameState = {}));
var CardColor;
(function (CardColor) {
    CardColor[CardColor["RED"] = 0] = "RED";
    CardColor[CardColor["YELLOW"] = 1] = "YELLOW";
    CardColor[CardColor["BLUE"] = 2] = "BLUE";
    CardColor[CardColor["GREEN"] = 3] = "GREEN";
})(CardColor || (CardColor = {}));
const default_options = {
    max_player: -1,
    game_type: GameType.NORMAL_UNO
};
const players = [];
const spectators = [];
const options = default_options;
const game_state = GameState.SETTING_UP;
const userJoin = (username, jwt_token) => {
    // Check if user already present in spectator
    const index = spectators.findIndex((spectator) => spectator.user_id === jwt_token);
    if (index !== -1)
        return false;
    // Add user to specator
    spectators.push({
        username: username,
        user_id: jwt_token
    });
    return true;
};
exports.userJoin = userJoin;
const removeSpectator = (user_id) => {
    const index = spectators.findIndex((spectator) => spectator.user_id === user_id);
    if (index === -1)
        return null;
    const removed_spectator = spectators.splice(index, 1)[0];
    return removed_spectator;
};
const spectatorJoinPlayer = (user_id) => {
    const removed_spectator = removeSpectator(user_id);
    if (removed_spectator === null)
        return false;
    players.push({
        username: removed_spectator.username,
        user_id: removed_spectator.user_id,
        deck: []
    });
    return true;
};
exports.spectatorJoinPlayer = spectatorJoinPlayer;
