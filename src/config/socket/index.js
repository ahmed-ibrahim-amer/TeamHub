const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

// Module-level variable. Node caches modules, so every file that does
// require('../socket') gets this SAME object - that's what makes the
// singleton pattern below work without passing `io` through every function call.
let io = null;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || '*',
            methods: ['GET', 'POST']
        }
    });

    // --- Authentication middleware ---
    // Runs once per connection attempt, BEFORE the 'connection' event fires.
    // Calling next(new Error(...)) rejects the handshake entirely - the
    // client's connect_error event fires and no socket is created.
    io.use((socket, next) => {
        try {
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.headers?.authorization?.split(' ')[1];

            if (!token) {
                return next(new Error('Authentication error: no token provided'));
            }

            // Same secret CreateAccessToken() in MakeTokens.js signs with.
            const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN);
            socket.user = decoded; // { id, role, iat, exp }
            next();
        } catch (err) {
            next(new Error('Authentication error: invalid or expired token'));
        }
    });

    // --- Connection handler ---
    // Everything below only runs for sockets that passed the middleware above.
    io.on('connection', (socket) => {
        console.log(`socket connected: user ${socket.user.id} (${socket.id})`);

        // Every user automatically gets their own private room.
        // This is how we push a notification to "this one person" later.
        socket.join(`user:${socket.user.id}`);

        // Client tells us which board they currently have open.
        // They should emit this right after connecting, and again
        // whenever they navigate to a different board.
        socket.on('board:join', (boardId) => {
            socket.join(`board:${boardId}`);
        });

        socket.on('board:leave', (boardId) => {
            socket.leave(`board:${boardId}`);
        });

        socket.on('disconnect', (reason) => {
            console.log(`socket disconnected: user ${socket.user.id} (${reason})`);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error('Socket.io not initialized - call initSocket(server) first.');
    }
    return io;
}

// --- Helper emitters ---
// Controllers/services import these instead of touching `io` directly.
// If you ever swap the room-naming scheme, you only change it here.
function emitToUser(userId, event, payload) {
    getIO().to(`user:${userId}`).emit(event, payload);
}

function emitToBoard(boardId, event, payload) {
    getIO().to(`board:${boardId}`).emit(event, payload);
}

module.exports = { initSocket, getIO, emitToUser, emitToBoard };
