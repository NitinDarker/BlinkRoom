# BlinkRoom

A real-time, room-based chat application powered by WebSockets. No signup, no login - just create a room and start chatting in seconds.

**Live Demo:** [blink-room.vercel.app](https://blink-room.vercel.app/)

## Features

- **Instant Access** - No authentication required, jump straight into conversations
- **Room-Based Chat** - Create private rooms or join existing ones with a room ID
- **Real-Time Messaging** - Powered by WebSockets for instant message delivery
- **Live Notifications** - See when users join or leave the room
- **Auto Cleanup** - Empty rooms are automatically deleted
- **Responsive UI** - Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, WebSocket (ws)
- **Deployment:** Vercel (frontend), Render (backend)

## Run Locally

```bash
git clone https://github.com/NitinDarker/BlinkRoom.git
cd BlinkRoom
```

**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

> Note: Update the WebSocket URL in `frontend/src/socket.ts` to `ws://localhost:8080` for local development.

## Author

**Nitin Sharma** - [GitHub](https://github.com/NitinDarker)

## License

[MIT](LICENSE)
