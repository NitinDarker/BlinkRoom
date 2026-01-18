import toast from "react-hot-toast";
let socket: WebSocket | null = null;
let roomId: string | null = null;
let username: string | null = null;

const serverUrl: string = "wss://blinkroom.onrender.com";

export function getUsername() {
  return username;
}

export function joinSocket(joinedRoomId: string, user: string, navigate: any, onError?: () => void) {
  // Always create a new socket for each tab/instance
  // This ensures each tab has its own connection
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(serverUrl);

  socket.onopen = () => {
    console.log("[socket] Connected");

    // Send join message immediately after connection
    socket?.send(
      JSON.stringify({
        type: "join",
        payload: { roomId: joinedRoomId, username: user },
      })
    );
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Server confirms join
    if (data.type === "server") {
      console.log("[server] Response:", data.payload.message);
      roomId = joinedRoomId;
      username = user;
      navigate("/dashboard");
    }

    // Server error
    if (data.type === "error") {
      console.log("[error] Server:", data.payload.message);
      socket?.close();
      socket = null;
      toast.error(data.payload.message);
      onError?.();
      return;
    }
  };

  socket.onclose = () => {
    console.log("[socket] Closed");
  };

  socket.onerror = (error) => {
    console.error("[error] Socket:", error);
    onError?.();
  };
}

export function createSocket(
  joinedRoomId: string,
  user: string,
  navigate: any,
  onError?: () => void
) {
  // Always create a new socket for each tab/instance
  // This ensures each tab has its own connection
  if (socket) {
    socket.close();
  }

  socket = new WebSocket(serverUrl);

  socket.onopen = () => {
    console.log("[socket] Connected");

    // Send create message immediately after connection
    socket?.send(
      JSON.stringify({
        type: "create",
        payload: { roomId: joinedRoomId, username: user },
      })
    );
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Server confirms create
    if (data.type === "server") {
      console.log("[server] Response:", data.payload.message);
      roomId = joinedRoomId;
      username = user;
      navigate("/dashboard");
    }

    // Server error
    if (data.type === "error") {
      console.log("[error] Server:", data.payload.message);
      socket?.close();
      socket = null;
      toast.error(data.payload.message);
      onError?.();
      return;
    }
  };

  socket.onclose = () => {
    console.log("[socket] Closed");
  };

  socket.onerror = (error) => {
    console.error("[error] Socket:", error);
    onError?.();
  };
}

export function getSocket() {
  return socket;
}

export function getRoomId() {
  return roomId;
}

export function disconnect() {
  if (socket) {
    console.log("[socket] Disconnecting");
    socket.close();
    socket = null;
    roomId = null;
    username = null;
  }
}

