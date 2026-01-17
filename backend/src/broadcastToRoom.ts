import type { WebSocket } from "ws";
import { User } from "./UserType.js";

// Helper function to broadcast to room
export default function broadcastToRoom(
  room: string,
  message: any,
  allSocket: User[],
  excludeSocket?: WebSocket
) {
  let sentCount = 0;
  allSocket.forEach((u: User) => {
    if (u.room === room && (!excludeSocket || u.socket !== excludeSocket)) {
      u.socket.send(JSON.stringify(message));
      sentCount++;
    }
  });
  console.log(`[broadcast] Sent message to ${sentCount} users in room ${room}`);
}
