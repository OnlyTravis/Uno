import { FC, useEffect, useState } from "react"

import InputContainer from "../../components/input_container";
import styles from "./lobby.module.css";
import SettingUpPage from "./setting_up";

enum GameState { SETTING_UP, PLAYING }

const LobbyPage:FC = () => {
    const [ ws, setWs ] = useState<WebSocket>();
    const [ gameState, setGameState ] = useState(GameState.SETTING_UP);

    useEffect(() => {
        setWs(new WebSocket(`ws://localhost:5000/echo`))// ###change-in-production
    }, [])
    useEffect(()=>{
        console.log("websocket change")
        if (!ws) {
            console.log('err')
            return;
        }
        ws.onopen = () => {
            console.log("websocket open")
            ws.send("test");
        }
        ws.onmessage = (msg) => {
            console.log(msg);
        }
        ws.onclose = () => {
            console.log("websocket closed")
        }
    },[ws])

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