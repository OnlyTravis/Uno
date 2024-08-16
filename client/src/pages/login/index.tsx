import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import styles from "./login.module.css";

import axios, { AxiosError } from "axios";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from 'react-router-dom'
import InputContainer from "../../components/input_container";

import default_usernames from "./default_usernames.json";

export default function LoginPage() {

    // Return Page
    return (
    <div className={styles.login_page}>
        <div className={styles.login_container}>
            <div className={styles.welcome_text}>Welcome</div>
            <br />
            <div className={styles.username_text}>Please Enter Your Username</div>
            <br />
            <InputContainer label="Username :" type="text" id="username-input" placeholder="Username"/>
        </div>
    </div>
    );
}