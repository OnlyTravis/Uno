import express from 'express';
import jwt from 'jsonwebtoken';

import { createSession } from '../code/sessions';
import { userJoin } from '../code/lobby';

const router = express.Router();


// Login router
router.post("/auth", (req, res) => {
    // Filter requests with no/invalid username
    if (!req.body.username) {
        res.status(400).json({message:"Please provide a username"});
        return;
    }
    if (req.body.username.length >= 20) {
        res.status(400).json({message:"Username too long!"});
        return;
    }

    // Signing login info with secret in .env
    const jwt_token = jwt.sign(req.body.username, process.env.SECRET);

    // Join Lobby as Spectator
    userJoin(req.body.username, jwt_token);

    // Create Session + Send response to client
    createSession(req.body.username, jwt_token);
    res.status(200).json({
        message: "Welcome",
        token: jwt_token
    })
});


// Check Authorization
router.all("/*", (req, res, next) => {
    if (!req.cookies || !req.cookies._auth) {
        res.status(401).send("Unauthoized Access");
        return;
    }
    const username = jwt.verify(req.cookies._auth, process.env.SECRET);
    if (username === JSON.parse(req.cookies._auth_state).username) next();
})

export default router;