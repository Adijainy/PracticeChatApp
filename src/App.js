import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [msg, setmsgs] = useState([]);
  const [newMsg, setnewMsg] = useState("");
  const [newRoom, setnewRoom] = useState("");
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
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
            setmsgs([...msg, newMsg]);
            socket.emit("msg", newMsg);
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
            setnewRoom("");
          }}
        >
          Room Code
        </button>
      </div>
    </div>
  );
}

export default App;
