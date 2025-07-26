# 💬 Chat App

A modern real-time chat application built with **React**, **Node.js**, **Express**, **Socket.IO**, and **MongoDB**. Designed with smooth UI/UX using **TailwindCSS**, this full-stack app lets users communicate instantly and share media seamlessly.

> Built for learning, exploring modern web stacks, and experimenting with real-time communication.

![Chat App Banner](https://raw.githubusercontent.com/rkgith01/media/refs/heads/main/All%20Folders/mern/chatapp_11.png) 

---

## 📋 Table of Contents

- 🤖 [Introduction](#-introduction)
- ⚙️ [Tech Stack](#-tech-stack)
- 🔋 [Features](#-features)
- 🚀 [Quick Start](#-quick-start)
- 🔧 [Project Structure](#-project-structure)
- 🧩 [Component & API Snippets](#-component--api-snippets)
- 🔗 [Resources](#-resources)
- 🙌 [Support & Contribution](#-support--contribution)

---

## 🤖 Introduction

This full-stack **Chat App** enables real-time text communication, image sharing, and dynamic interaction using **WebSockets** (Socket.IO). The frontend is powered by React and Vite for lightning-fast performance, while the backend runs on Express with MongoDB for persistent storage and file handling via GridFS.

Whether you’re learning how full-stack apps communicate in real-time or exploring how sockets, modals, and custom components work together, this app offers a practical, hands-on project.

---

## ⚙️ Tech Stack

**Frontend:**
- ⚛️ React 18 + Vite
- 💨 TailwindCSS
- 🔁 React Router DOM
- 🔥 React Toastify
- 📦 Axios
- ✨ Lucide React Icons
- 📤 React Input Emoji, React Modal

**Backend:**
- 🛠️ Node.js + Express.js
- 🧬 MongoDB + Mongoose
- 📦 GridFS & Multer for file uploads
- 🔐 JWT for authentication
- 🌐 Socket.IO + WebSocket (ws) for real-time messaging
- 🔄 CORS, Cookie Parser

---

## 🔋 Features

✅ **Real-time Messaging**  
✅ **One-on-One Chat Rooms**  
✅ **Emoji Support**  
✅ **Responsive UI with TailwindCSS**  
✅ **Modals for user interaction**  
✅ **User Authentication with JWT**  
✅ **File Upload via GridFS (Images, etc.)**  
✅ **Toast Notifications for feedback**  
✅ **Frontend & Backend Separation**  

---

## 🚀 Quick Start

### 🧰 Prerequisites

Ensure the following are installed on your machine:

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)
- Git

---

### 📦 Frontend Setup

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app/frontend
npm install
npm run dev
App will start at http://localhost:5173
```
⚙️ Backend Setup
```bash
Copy
Edit
cd ../backend
npm install
npm run dev
Backend runs at http://localhost:5000
```


🔐 Auth & Chat APIs
```js
Copy
Edit
// Sample login route
POST /api/auth/login
{
  "username": "user123",
  "password": "secret"
}
```
```js
Copy
Edit
// Sample message send
POST /api/chat/message
{
  "from": "user123",
  "to": "user456",
  "text": "Hey there!"
}
```
🔗 Resources
- Socket.IO Documentation

- MongoDB GridFS

- TailwindCSS

- Vite Docs

- React Toastify

🙌 Support & Contribution
This project is currently for educational and experimental use. You’re welcome to fork it and explore the code. If you'd like to contribute:
  1. 🍴 Fork the repository
  
  2. 🌱 Create a new branch
  
  3. 🔧 Make your changes
  
  4. 📩 Open a Pull Request with a short description

💡 Future Improvements
- Group chats / Channels

- Chat history persistence

- User avatars & profile updates

- Typing indicators

- Online/offline status

Let’s build fun and powerful apps together. Thanks for checking out this project!
