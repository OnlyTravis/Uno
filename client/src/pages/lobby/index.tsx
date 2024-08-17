import { FC, useState } from "react"

import InputContainer from "../../components/input_container";
import styles from "./lobby.module.css";
import SettingUpPage from "./setting_up";

enum GameState { SETTING_UP, PLAYING }

const LobbyPage:FC = () => {
    const [ gameState, setGameState ] = useState(GameState.SETTING_UP);

    return (
        <div className={styles.main_page}>
            {
            (gameState === GameState.SETTING_UP)?
            <SettingUpPage />
            :
            <div>temp</div>
            }
        </div>
    );
}

export default LobbyPage;