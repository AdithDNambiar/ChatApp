# Real-Time Chat Application

## Overview

This project is a **Real-Time Chat Application** built as part of my **2nd internship task**. The application allows multiple users to communicate in real-time through chat rooms while supporting file sharing, voice messages, and authentication features.

The system is built using a **full-stack JavaScript architecture**, combining **React (frontend)**, **Node.js + Express (backend)**, and **Socket.IO** for real-time communication.

---

# Features

## Authentication System
- User Registration
- User Login
- Secure Logout
- Email and Password based authentication
- User session stored in browser local storage

## Real-Time Messaging
- Real-time chat using **Socket.IO**
- Room-based chat system
- Multiple users can join the same room
- Instant message broadcasting
- Auto-scroll to newest message

## System Messages
- User joined room notifications
- User left room notifications
- Highlighted system messages in chat

## File Sharing
Users can send different types of files including:

- Images
- Videos
- PDFs
- Documents
- Other file types

File previews inside the chat interface:
- Images preview directly
- Videos playable inside chat
- Audio playable inside chat
- Other files downloadable

## Voice Messages
- Record audio directly from browser
- Send voice messages in chat
- Audio playback support

## Chat Interface
- Sender and receiver message bubbles
- Clean chat layout
- Real-time updates
- Scrollable message history
- Input box with file attach and audio recording buttons

---

# Tech Stack

## Frontend
- React
- React Router
- Axios
- Socket.IO Client
- CSS

## Backend
- Node.js
- Express.js
- Socket.IO
- Multer (file uploads)
- MongoDB (for message storage)

---

# Project Structure

```
chat-system
│
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── sockets
│   │   └── app.js
│   │
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Chat.jsx
│   │   │
│   │   ├── components
│   │   ├── api
│   │   │   └── axios.js
│   │   │
│   │   ├── socket.js
│   │   ├── index.css
│   │   └── App.js
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

## 1. Clone the Repository

```
git clone https://github.com/your-username/chat-system.git
```

```
cd chat-system
```

---

# Backend Setup

Navigate to backend folder

```
cd backend
```

Install dependencies

```
npm install
```

Start the server

```
npm start
```

Server runs on

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend folder

```
cd frontend
```

Install dependencies

```
npm install
```

Start the React application

```
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

# Usage

1. Register a new account
2. Login using email and password
3. Enter a chat room
4. Start sending messages in real-time
5. Share files or voice messages
6. View system notifications when users join or leave

---

# Key Learning Outcomes

This project helped me learn and practice:

- Full-stack application development
- Real-time communication using Socket.IO
- Frontend and backend integration
- File upload handling
- Browser audio recording
- Authentication systems
- Building interactive user interfaces with React

---

# Future Improvements

Possible enhancements include:

- Message timestamps
- Message read receipts
- Emoji picker
- Typing indicators
- User online status
- Drag and drop file uploads
- Mobile responsive UI

---

# Author

Developed by **Adith** as part of an **Internship Task Project**.

---

# License

This project is for **learning and internship demonstration purposes**.
