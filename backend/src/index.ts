import { WebSocketServer } from "ws";
import { User } from "./UserType";
import logRoomStatus from "./logRoomStatus";
import broadcastToRoom from "./broadcastToRoom";

const PORT = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port: PORT });

const allSocket: User[] = [];
const rooms = new Map<string, { users: User[] }>();

wss.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.on("message", (e) => {
    const parsedMessage = JSON.parse(e.toString());
    console.log(
      "📨 Received message:",
      parsedMessage.type,
      parsedMessage.payload
    );

    if (parsedMessage.type === "create") {
      const roomId = parsedMessage.payload.roomId;
      const username = parsedMessage.payload.username;

      if (rooms.has(roomId)) {
        socket.send(
          JSON.stringify({
            type: "error",
            payload: { message: "Room already exists" },
          })
        );
        return;
      }

      const newUser: User = { socket, room: roomId, username };
      allSocket.push(newUser);
      
      rooms.set(roomId, { users: [newUser] });

      socket.send(
        JSON.stringify({
          type: "server",
          payload: {
            message: `Room ${roomId} created. You joined as ${username}`,
          },
        })
      );
      logRoomStatus(allSocket);
      return;
    }

    if (parsedMessage.type === "join") {
      const roomId = parsedMessage.payload.roomId;
      const username = parsedMessage.payload.username;

      if (!rooms.has(roomId)) {
        socket.send(
          JSON.stringify({
            type: "error",
            payload: { message: "Room does not exist" },
          })
        );
        return;
      }

      if (rooms.get(roomId)!.users.some((u) => u.username === username)) {
        socket.send(
          JSON.stringify({
            type: "error",
            payload: { message: "username taken" },
          })
        );
        return;
      }

      const newUser: User = { socket, room: roomId, username };
      allSocket.push(newUser);
      rooms.get(roomId)!.users.push(newUser);

      socket.send(
        JSON.stringify({
          type: "server",
          payload: { message: `You joined room ${roomId} as ${username}` },
        })
      );

      // Notify others in room
      broadcastToRoom(
        roomId,
        {
          type: "server",
          payload: { message: `${username} joined the room` },
        },
        allSocket,
        socket
      );
      logRoomStatus(allSocket);
      return;
    }

    if (parsedMessage.type === "chat") {
      // Get the room and username of this socket
      const currentUser = allSocket.find((u) => u.socket === socket);
      if (!currentUser) {
        console.warn("⚠️ User not found in socket list");
        console.log(
          "🔍 Current socket list:",
          allSocket.map((u) => ({
            room: u.room,
            username: u.username,
            socketId: u.socket.readyState,
          }))
        );
        logRoomStatus(allSocket);
        return;
      }

      const room = currentUser.room;
      const author = currentUser.username;
      console.log("🏠 Broadcasting to room:", room, "from", author);

      // ✅ Broadcast to everyone in the same room
      broadcastToRoom(
        room,
        {
          type: "chat",
          payload: {
            message: parsedMessage.payload.message,
            author,
          },
        },
        allSocket
      );
    }
  });

  socket.on("close", () => {
    console.log("🔴 Socket disconnected");
    const index = allSocket.findIndex((u) => u.socket === socket);
    if (index !== -1) {
      const user = allSocket[index];
      console.log(`➖ Removed user from room: ${user.room} (${user.username})`);

      // Remove from room map
      const room = rooms.get(user.room);
      if (room) {
        room.users = room.users.filter((u) => u.socket !== socket);
        if (room.users.length === 0) rooms.delete(user.room); // delete empty rooms
      }

      // Notify others in the room that someone left
      broadcastToRoom(
        user.room,
        {
          type: "server",
          payload: { message: `${user.username} left the room` },
        },
        allSocket
      );
      allSocket.splice(index, 1); // Remove user from list
      logRoomStatus(allSocket);
    }
  });
});

