import express, { Request, Responce } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { userJoin } from '../code/lobby';

const router = express.Router();

export interface CookieFormat {
    username: string,
    user_session_id: string
}
export function cookieIsValid(cookie: CookieFormat) {
    return (cookie && cookie.user_session_id && cookie.username);
}

// Login router
router.post("/login", (req, res) => {
    // Filter requests with no/invalid username
    if (!req.body.username) {
        res.status(400).json({message:"Please provide a username"});
        return;
    }
    if (req.body.username.length >= 20) {
        res.status(400).json({message:"Username too long!"});
        return;
    }

    // Add Cookie
    const user_session_id = uuidv4();
    res.cookie("username", req.body.username, { signed: true, domain: "" });
    res.cookie("user_session_id", user_session_id, { signed: true });

    // Join Lobby as Spectator
    userJoin(req.body.username, user_session_id);

    // Send response to client
    res.status(200).json({
        message: "Welcome",
    })
});

// For Client to check if they are authorized
router.get("/is_auth", (req: Request, res: Responce) => {
    console.log("is_auth")
    console.log(req.cookie)
    console.log(req.cookies)
    console.log(req.signedCookies)
    if (!cookieIsValid(req.signedCookies)) {
        res.status(200).send(false);
        return;
    }
    res.status(200).send(true);
});

// Check Authorization
router.all("/*", (req, res, next) => {
    if (!cookieIsValid(req.signedCookies)) {
        res.status(401).send("Unauthoized Access");
        return;
    }
    next();
})

export default router;