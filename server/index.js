const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('mensaje', (data) => {
        // Importante: lo que recibimos del cliente lo enviamos a todos
        io.emit('mensaje', {
            nombre: data.nombre, // Antes estaba como 'name' en tu HTML, lo unificamos a 'nombre'
            texto: data.texto,
            id: socket.id.slice(0, 5)
        });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

const PORT = process.env.PORT || 6969;
server.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));