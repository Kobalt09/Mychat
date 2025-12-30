

const express = require('express');
const http = require('http');
const {Server} =  require ('socket.io');
const cors = require('cors');


const app = express();
app.use(cors());

const server= http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET","POST"]
    }
})


io.on('connection', (socket) =>{
    console.log('Usuario se conecto: ', socket.id);

    socket.on('mesaje', (data)=>{
        io.emit('mesaje',{
            texto:data,
            id:socket.id.slice(0,5)
        })

    })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ', socket.id);
    });

})

const PORT = process.env.PORT || 6969;
server.listen(PORT, () => console.log(`Servidro en puerto ${PORT}`));