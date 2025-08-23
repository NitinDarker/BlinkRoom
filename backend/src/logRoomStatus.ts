import { User } from "./UserType";

// Helper function to log room status
export default function logRoomStatus(allSocket: User[]) {
  const roomCounts: { [key: string]: number } = {};
  allSocket.forEach((user) => {
    roomCounts[user.room] = (roomCounts[user.room] || 0) + 1;
  });
  console.log("📊 Room status:", roomCounts);
  console.log("👥 Total connected users:", allSocket.length);
}