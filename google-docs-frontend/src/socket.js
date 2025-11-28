// src/socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:5000"; // backend URL
const socket = io(URL);

export default socket;