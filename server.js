const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http)

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.render("index");
});

// socket part
io.on("connection", (socket) => {
    console.log("Connected socket io ....");
    socket.on("message", (msg) => {
        socket.broadcast.emit('message', msg);

    })
})

http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});