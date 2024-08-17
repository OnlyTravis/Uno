import express from 'express';
const router = express.Router();





export const mountRouter = () => {
    router.ws('/echo', function(ws, req) {
        ws.on('message', function(msg) {
          ws.send(msg);
        });
    }); 
}
export default router;