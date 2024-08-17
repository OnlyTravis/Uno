enum GameType { NORMAL_UNO }
enum GameState { SETTING_UP, PLAYING }
enum CardColor { RED, YELLOW, BLUE, GREEN }

interface Card {
    color: CardColor,
    number: number
}
interface Player {
    username: string,
    user_id: string
    deck: Card[]
}
interface Spectator {
    username: string,
    user_id: string
}
interface LobbyOptions {
    max_player: number,
    game_type: GameType
}

const default_options: LobbyOptions = {
    max_player: -1,
    game_type: GameType.NORMAL_UNO
}


const players: Player[] = [];
const spectators: Spectator[] = [];
const options: LobbyOptions = default_options;
const game_state: GameState = GameState.SETTING_UP;

export const userJoin = (username: string, jwt_token: string) => {
    // Check if user already present in spectator
    const index = spectators.findIndex((spectator) => spectator.user_id === jwt_token);
    if (index !== -1) return false;

    // Add user to specator
    spectators.push({
        username: username,
        user_id: jwt_token
    });
    return true
}

const removeSpectator = (user_id: string): Spectator|null => {
    const index = spectators.findIndex((spectator) => spectator.user_id === user_id);
    if (index === -1) return null;

    const removed_spectator = spectators.splice(index, 1)[0];
    return removed_spectator;
}
    
export const spectatorJoinPlayer = (user_id): boolean => {
    const removed_spectator = removeSpectator(user_id);
    if (removed_spectator === null) return false;

    players.push({
        username: removed_spectator.username,
        user_id: removed_spectator.user_id,
        deck: []
    });

    return true;
}