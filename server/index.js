import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';


import { Server as SocketServer } from 'socket.io'
import { PORT } from './config.js';

// ==========================================================

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server,{
  // cors:{
  //   origin:'http://localhost:3000',
  // }
});

const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname);


// ==========================================================

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "../client/build")));

// ==========================================================

/* Listening for a connection from the client. */
io.on('connection',(socket)=>{
  // console.log(socket.id)
  
  // Recibe msj de cliente
  socket.on('sendMessage',(message)=>{

    // Reenvia msj a todos los clientes
    socket.broadcast.emit('receiveMessage',{
      body:message,
      from:socket.id,
    })
  })
})

// ==========================================================

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})