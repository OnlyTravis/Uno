import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom'

import default_usernames from "./default_usernames.json";
import { getRandom } from "../../code/utils";
import styles from "./login.module.css";

const LoginPage:FC = () => {
    // Handle Username Input
    const [ Username, setUsername ] = useState("");
    const usernameOnChange = (e: ChangeEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    } 

    // Handle Join Request
    const navigate = useNavigate();
    async function join(e: MouseEvent) {
        try {
            const response = await axios.post(`http://localhost:5000/login`, { username: Username });// ###change-in-production
            navigate("/lobby");
        } catch (err) {
            if (err && err instanceof AxiosError) alert(err.response?.data.message);
            else if (err && err instanceof Error) console.log(err)
        }
    }

    // If user is already logged in ---> Send to lobby
    useEffect(() => {
        const p = new Promise(async (res, rej) => {
            const responce = await axios.get(`http://localhost:5000/is_auth`);
            if (responce.data) navigate("/lobby");
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    const test = async () => {
        const responce = await axios.get(`http://localhost:5000/is_auth`);
    }

    // Return Page
    return (
    <div className={styles.main_page}>
        <div className={styles.login_container}>
            <div className={styles.welcome_text}>Welcome</div>
            <br />
            <div className={styles.username_text}>Please Enter Your Username</div>
            <br />
            <br />
            <input type="text" className={styles.username_input} placeholder={getRandom(default_usernames)} onChange={usernameOnChange}></input>
            <br />
            <br />
            <div className={styles.tips}>{(Username?"":"*Please Enter a username")+(Username.length > 20?"*Username cannot exceed 20 characters":"")}</div>
            <div className={styles.join_button_container}>
                <button className={(Username && Username.length <= 20)?"enabled":"disabled"} onClick={join}>Join Lobby</button>
            </div>
        </div>
        <button onClick={test}>Test</button>
    </div>
    );
}

export default LoginPage;