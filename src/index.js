const express = require("express");
const socketIO = require("socket.io");
const Router = require("./routes/index.js");
const path = require("path");
const http = require("http");
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

// settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// sockets
require("./sockets.js")(io);

// middlewares
app.use(express.static(path.join(__dirname, "public")));

// rutas
app.use(Router);

app.use((err, req, res, next) => {
  if (err) return console.log("Hubo un error en el servidor", err);
});

server.listen(process.env.PORT || 3000, () =>
  console.log("server on port 3000")
);
