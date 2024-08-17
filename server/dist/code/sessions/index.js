"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.getSessionFromToken = getSessionFromToken;
const sessions = [];
function checkSessions() {
}
function createSession(username, jwt) {
    const new_session = {
        jwt: jwt,
        username: username,
        is_in_lobby: false,
        date_created: new Date().getTime()
    };
    sessions.push(new_session);
}
function getSessionFromToken(jwt) {
    const session = sessions.find((session) => session.jwt === jwt);
    return session;
}
