import { Server } from 'http';
import { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import cookieParser from 'cookie-parser';

import { cookieIsValid } from '../../routers/auth';

export default function configureWebsocket(server: Server) {
    const wss = new WebSocketServer({ noServer: true });

    // Handle upgrade event
    server.on("upgrade", (req, socket, head) => {
        cookieParser(process.env.COOKIE_SECRET)(req as Request, {} as Response, () => {
            const signed_cookies = (req as Request).signedCookies;
            console.log("upgrade")
            console.log(signed_cookies)

            // Destroy Connection if user is not logged in
            if (!cookieIsValid(signed_cookies)) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
            }

            // Connect Websocket
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit('connection', ws, req);
            });
        })
    });

    // Handle Websocket connection stuff
    wss.on("connection", (ws) => {
        ws.on("message", (data, is_binary) => {
            console.log("-------------------------")
            console.log("Received Websocket Message:")
            console.log(data.toString());
            console.log(is_binary)
            console.log("-------------------------")
        });
    });
}