import { FC, useState } from "react"

import styles from "./setting_up.module.css";
import ImageButton from "../../components/image_button";

const SettingUpPage:FC = () => {
    const [ userSettingsOpened, setUserSettingsOpened ] = useState<boolean>(false);

    return (<>
        <div className={styles.setting_up_page}>
            <div className={styles.setting_up_container}>
                <div className={styles.settings_container}></div>
                <div className={styles.players_list}></div>
                <div className={styles.spectators_list}></div>
            </div>
        </div>
        <ImageButton className={styles.user_settings_button} src="/imgs/icon.png" animation="expand" onClick={() => { setUserSettingsOpened(!userSettingsOpened) }} />
        <div className={styles.user_settings_container} hidden={!userSettingsOpened}>
            fdhdgfsgsgsdsffasdsfaasf
        </div>
    </>);
}

export default SettingUpPage