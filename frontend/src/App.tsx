import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket,setSocket]=useState<any>(null);
  const [msg,setMsg]=useState("");
  const [latestMsg,setLatestMsg]=useState("");

  useEffect(()=>{
    const socket=new WebSocket('ws://localhost:8080');
    socket.onopen=()=>{
      console.log("Connected");
      setSocket(socket);
    }
    socket.onmessage=(x)=>{
      console.log("Message Received :",x.data);
      setLatestMsg(x.data);
    }
    setSocket(socket);
    return (()=>{
      socket.close();
    })
  },[]);

  if(!socket){
    return <div>
      connecting to socket server........
    </div>
  };
  return (
    <>
      <input onChange={(e)=>{
        setMsg(e.target.value);
      }}>
      </input>
      <button onClick={()=>{
        socket.send(msg);
      }}>
        Send
      </button>
      {latestMsg}
    </>
  )
}

export default App
