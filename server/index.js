const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const express = require("express");

const app = express();
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("msg", (msg) => {
    console.log(msg);
  });
});
