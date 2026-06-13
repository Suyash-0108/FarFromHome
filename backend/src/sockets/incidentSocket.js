import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client Disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => io;