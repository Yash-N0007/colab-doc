# 📄 Real-Time Collaborative Document Editor (Distributed Computing Project)

This repository contains a real-time collaborative text editing system built using modern full-stack web technologies. The project demonstrates key distributed computing principles through live synchronization, event-driven communication, and shared state management across multiple clients.

The system consists of:

1. **collabDoc-backend** – A Node.js + Express + Socket.IO backend that manages WebSocket connections, real-time events, and MongoDB persistence.
2. **google-docs-frontend** – A React application using Quill.js for rich-text editing and Socket.IO Client for receiving/sending live updates.

Together, these components form a minimal but functional Google-Docs-style collaborative editor.

---

# 📘 Project Components

## 1. Real-Time Editing Engine
Built using **Socket.IO**, this module manages:
- Bi-directional WebSocket communication  
- Broadcasting text changes to all connected users  
- Synchronizing document state across clients  
- Handling multiple active users in the same editing room

This ensures that every user sees updates instantly without page refresh.

---

## 2. Rich-Text Editor (Frontend)
Implemented using **React + Quill.js**, it provides:
- A modern WYSIWYG editing interface  
- Delta-based text change tracking  
- Seamless integration with WebSocket events  
- Local rendering of remote edits  

Quill’s delta format makes updates efficient and conflict-free.

---

## 3. Document Persistence (MongoDB)
The backend stores the current document state in MongoDB:
- Autosaves occur every few seconds  
- Document data stored as Quill delta JSON  
- Persistence ensures users never lose progress  
- Consistent shared state across reconnects  

This demonstrates fault tolerance in a distributed setup.

---

## 4. Distributed Computing Concepts Demonstrated

This project highlights multiple DC principles:

- **Concurrency** – Multiple users editing together  
- **Synchronization** – Real-time propagation of changes  
- **Message Passing** – WebSocket events for communication  
- **Fault Tolerance** – Persistent MongoDB storage  
- **Event-Driven Architecture** – Server reacts to client events  
- **Shared State Management** – Consistent document view across nodes  

---

## 5. Tech Stack
- **Frontend:** React.js, Quill.js, Socket.IO Client  
- **Backend:** Node.js, Express.js, Socket.IO  
- **Database:** MongoDB + Mongoose  
- **Utilities:** dotenv, CORS  

---

## 6. System Architecture

React + Quill Frontend  
⬇️ ⬆️ (WebSocket – Socket.IO)  
Node.js + Express Backend  
⬇️ ⬆️  
MongoDB
