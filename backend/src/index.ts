import WebSocket,{WebSocketServer} from 'ws';
import http from 'http';

const server=http.createServer((req:any,res:any)=>{
  console.log((new Date())+' Received request for '+req.url);
  res.end("Hi from http server");
})

const wss=new WebSocketServer({server});

wss.on('connection',(ws)=>{
  ws.on('error',(err)=>{
    console.log(err);
  })

  ws.on('message',(data,isBinary)=>{
    wss.clients.forEach(function each(client){
      if(client.readyState===WebSocket.OPEN){
        client.send(data,{binary:isBinary});
      }
    })
  })
  ws.send('Hello Message from Socket Server');
})

server.listen(8080,()=>{
  console.log((new Date())+' Http Server is listening on port 8080');
})