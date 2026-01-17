import { User } from "./UserType.js";

// Helper function to log room status
export default function logRoomStatus(allSocket: User[]) {
  const roomCounts: { [key: string]: number } = {};
  allSocket.forEach((user) => {
    roomCounts[user.room] = (roomCounts[user.room] || 0) + 1;
  });
  console.log("[status] Rooms:", roomCounts);
  console.log("[status] Total connected users:", allSocket.length);
}