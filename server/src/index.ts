import express, {} from 'express';
import cors from 'cors';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

// Importing Routers 
import auth_router from './routers/auth';
import configureWebsocket from './code/websocket';
import { createProxyMiddleware } from 'http-proxy-middleware';


dotenv.config();
const PORT = process.env.PORT ?? 3000;


// Initialize Web App
const app = express();
app.set('view engine', 'pug');
app.use(cors()); // remove in production
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

app.get("/*", (req, res, next) => {
    console.log("============================================================")
    console.log(`GET_Request_url : ${req.url}`)
    console.log(`IP: ${req.ip}`)
    console.log("Request_body :")
    console.log(req.body);
    console.log("Signed_Cookies : ")
    console.log(req.signedCookies)
    console.log("============================================================")
    next();
});
app.post("/*", (req, res, next) => {
    console.log("============================================================")
    console.log(`POST_Request_url : ${req.url}`)
    console.log(`IP: ${req.ip}`)
    console.log("Request_body :")
    console.log(req.body);
    console.log("Signed_Cookies : ")
    console.log(req.signedCookies)
    console.log("============================================================")
    next();
});

// No Authorization Needed
app.get(['/', '/login'], (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// Auth Router includes check for authorization
app.use(auth_router);



app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Launch Application
const server = app.listen(PORT, () => {
    console.log(`Backend Server Opened on Port : ${PORT}`);
});
configureWebsocket(server);