import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [msg, setmsgs] = useState([]);
  const [newMsg, setnewMsg] = useState("");
  const [newRoom, setnewRoom] = useState("");
  const [roomName, setroomName] = useState("");
  
  const socket = useMemo(()=>
    io('http://localhost:4000')
  ,[])

  socket.on("receive-msg", (message) => {
    // console.log(message);
    setmsgs([...msg, message]);
  });


  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    
    
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(msg);
  return (
    <div className="main">
      <h1>Chat App</h1>
      <div>
        <ul>
          {msg.map((items, idx) => (
            <li key={idx}>{items}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setnewMsg(e.target.value)}
          value={newMsg}
        />
        <button
          onClick={() => {
            setmsgs([...msg, `You: ${newMsg}`]);
            socket.emit("msg", {newMsg, roomName});
            setnewMsg("");
          }}
        >
          Add
        </button>
      </div>
      
      <div>
        <input
          type="text"
          onChange={(e) => setnewRoom(e.target.value)}
          value={newRoom}
        />
        <button
          onClick={() => {
            socket.emit('join-room', newRoom);
            setroomName(newRoom);
            setnewRoom("");
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default App;
