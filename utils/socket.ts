import { io } from "socket.io-client";

// Get base URL without /api/v1 suffix if possible
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// Ensure SOCKET_URL points to the root (e.g., http://localhost:4000)
// by removing /api and /api/v1 suffixes
const SOCKET_URL = API_URL.replace(/\/api(\/v1)?\/?$/, "");

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket", "polling"],
});
