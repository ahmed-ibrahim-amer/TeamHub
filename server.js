// const express = require('express');
// const app = require('./app');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

// const PORT = process.env.PORT || 3000;

// const http = require('http');
// const { Server } = require('socket.io');

// const server = http.createServer(app);

// const io = new Server(server);




// //DataBase connection
// //TODO MAKE SERVER FOR DataBase
// const ConectionToDataBase = mongoose.connect(process.env.MONGO_URI).then(()=>{
//     console.log('Connection to database sucessfully');
//         server.listen(PORT,(req,res)=>{
//             console.log(`the server running on http://localhost:3000`);
//         });
// }).catch((error)=>{
//     console.error(error);
// });

const express = require('express');
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.IO
io.on("connection", (socket) => {
    console.log(`✅ User Connected: ${socket.id}`);

    // اختبار Event
    socket.on("test", (data) => {
        console.log("📨 Test Event:", data);
    });

    // الانضمام لغرفة Board
    socket.on("board:join", (boardId) => {
        socket.join(boardId);
        console.log(`${socket.id} joined board ${boardId}`);
    });

    socket.on("disconnect", () => {
        console.log(`❌ User Disconnected: ${socket.id}`);
    });
});

// DataBase connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connection to database successfully');

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

})
.catch((error) => {
    console.error(error);
});