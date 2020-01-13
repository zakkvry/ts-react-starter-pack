import express from "express";
import http from "http";
import path from "path";
import socketio from "socket.io";

const app: express.Application = express();

const server = http.createServer(app);

const io = socketio(server);
console.log("hi guise");
io.on("connection", (socket: any) => {
    console.log("Socket connected: ", socket.handshake.url);
    socket.on("disconnect", reason => {
        console.log("Socket disconnected bzoc: ", reason);
    })
});

const publicPath = "./dist/public";

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    console.log(`${req.method} ${req.path}`);
    res.sendFile("index.html", { root: publicPath });
});

server.listen(8080, () => console.log("Server is now listening on 8080!"));
