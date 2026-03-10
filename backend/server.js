const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Message = require("./models/Message");
const sendEmail = require("./utils/sendEmail");

const connectDB = require("./config/db");

const multer = require("multer");
const path = require("path");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

/* ---------------- BASIC ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

/* ---------------- ROOMS ---------------- */

let rooms = ["room1", "room2", "room3"];
let users = {};
let roomUsers = {};

/* ---------------- API ROUTES ---------------- */

app.get("/api/rooms", (req, res) => {
  res.json(rooms);
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});



app.use("/uploads", express.static("uploads"));

app.post("/api/upload", upload.single("file"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });

});

/* REGISTER */

app.post("/api/register", async (req, res) => {
  try {

    const { name, email } = req.body;

    const password = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(password, 10);

    const username = name.toLowerCase().replace(/\s/g, "");

    await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      joinDate: new Date().toLocaleDateString(),
      joinTime: new Date().toLocaleTimeString(),
    });

    await sendEmail(email, password);

    res.json({ message: "Password sent to your email." });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration error" });
  }
});

/* LOGIN */

app.post("/api/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      username: user.username,
      email: user.email,
      joinDate: user.joinDate,
      joinTime: user.joinTime,
    });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

/* DASHBOARD */

app.get("/api/dashboard", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* ---------------- SOCKET SERVER ---------------- */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/* SOCKET CONNECTION */

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  /* JOIN ROOM */

  socket.on("join-room", async ({ username, room }) => {

    socket.join(room);

    users[socket.id] = username;

    if (!roomUsers[room]) {
      roomUsers[room] = [];
    }

    if (!roomUsers[room].includes(username)) {
      roomUsers[room].push(username);
    }

    /* SEND OLD MESSAGES */

    const oldMessages = await Message.find({ room });

    socket.emit("previous-messages", oldMessages);

    /* UPDATE USER LIST */

    io.to(room).emit("user-list", roomUsers[room]);

    /* SYSTEM MESSAGE */

    io.to(room).emit("receive-message", {
      system: true,
      message: `${username} joined the chat`,
      time: new Date().toLocaleTimeString(),
    });

  });

  /* SEND MESSAGE */

  socket.on("send-message", async ({ room, message, fileUrl, fileType, fileName }) => {

    const username = users[socket.id];

    const msgData = {
      room,
  sender: username,
  message,
  fileUrl,
  fileType,
  fileName,
  time: new Date().toLocaleTimeString(),
    };

    /* SAVE TO DATABASE */

    await Message.create(msgData);

    /* SEND TO ROOM */

    io.to(room).emit("receive-message", msgData);

  });

  /* DISCONNECT */

  socket.on("disconnect", () => {

    const username = users[socket.id];

    if (!username) return;

    for (let room in roomUsers) {

      roomUsers[room] = roomUsers[room].filter(
        (u) => u !== username
      );

      io.to(room).emit("user-list", roomUsers[room]);

      io.to(room).emit("receive-message", {
        system: true,
        message: `${username} left the chat`,
        time: new Date().toLocaleTimeString(),
      });

    }

    delete users[socket.id];

    console.log("User disconnected:", socket.id);

  });

});

/* ---------------- START SERVER ---------------- */

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});