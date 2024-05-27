import express from "express";
import { WebSocketServer,WebSocket  } from 'ws';

const app=express();
const httpServer=app.listen(8080);

const wss = new WebSocketServer({ server:httpServer });

wss.on('connection', function connection(ws) {

  ws.on('error', console.error);

  ws.on('message',(data)=>{
    wss.clients.forEach(function each(client){
        if(client.readyState===WebSocket.OPEN){
            client.send(data);
        }
    });
  })
  ws.send('Hello ! Message from server');
});

