import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Importing Routers 
import auth_router from './routers/auth';
import lobby_router, { mountRouter } from './routers/lobbys'


dotenv.config();
const PORT = process.env.PORT ?? 3000;


// Initialize Web App
const app = express();
expressWs(app);
app.set('view engine', 'pug');
app.use(cors()); // remove in production
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

// ###For Testing
app.all("/*", (req, res, next) => {
    console.log("============================================================")
    console.log(`Request_url : ${req.url}`)
    console.log("Request_body :")
    console.log(req.body);
    console.log("============================================================")
    next();
});

// No Authorization Needed
app.get(['/', '/login'], (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Auth Router includes check for authorization
app.use(auth_router);
mountRouter();
app.use("/lobby", lobby_router);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Launch App
app.listen(PORT, () => {
    console.log(`Backend Server Opened on Port : ${PORT}`);
});