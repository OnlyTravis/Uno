const sessions: UserSession[] = [];

interface UserSession {
    jwt: String,
    username: String,
    is_in_lobby: Boolean,
    date_created: Number,
}

function checkSessions() {
    
}

export function createSession(username: String, jwt: String) {
    const new_session: UserSession = {
        jwt: jwt,
        username: username,
        is_in_lobby: false,
        date_created: new Date().getTime()
    }
    sessions.push(new_session);
}

export function getSessionFromToken(jwt: String) {
    const session = sessions.find((session: UserSession) => session.jwt === jwt);
    return session;
}