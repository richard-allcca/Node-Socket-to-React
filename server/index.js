import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';

// para crear el __dirname  
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { Server as SocketServer } from 'socket.io';
import { PORT } from './config.js'; // NOTE - importante la extencion del archivo con "type:module"


// SECTION - Creation SocketServer

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    // origin: 'http://localhost:5173',
    origin: '*',
  }
});

// Tomamos la ruta principal del archivo que se esta ejecutando 
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(morgan("dev")); // show results of the request http
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "../client/build")));


// SECTION - Listening for a connection from the client.

io.on('connection', (socket) => { // socket recibe la data del cliente conenctado

  // Recibe msj de cliente
  socket.on('sendMessage', (message) => {

    // Broaccast - Reenvia msj a todos los clientes
    // socket.broadcast.emit('sendMessage', {
    //   body: message,
    //   from: socket.id.slice(8),
    // });
    socket.broadcast.emit('sendMessage', message);
  });
});


// REVIEW - usar el server de socket

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});