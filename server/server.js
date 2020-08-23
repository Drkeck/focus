const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const { v4: uuidV4 } = require('uuid')

const PORT = process.env.PORT || 3001;
const app = express();

// for some reason socket.io really wants this line of code, even if its entirely unnecessary for the rest of the server.
var http = require('http').Server(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

// connect socket.io to the server.
const io = require('socket.io')(http)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});




app.get('/create-room', (req, res) => {
  console.log("does this work")
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('../client/src/pages/room', { roomId: req.params.room })
})

// establish the socket.io connect so that the engine is able to pass data to all others on the server.
var users = {}

io.on('connection', socket => {

  socket.on('sendNickname', function(username) {
    socket.username = username;
    users[username] = socket;
    console.log(username);
  });

  socket.on('join-room', (roomId, userId) => {
    /*
    if (!person[socket.id]) {
      person[socket.id] = socket.id;
    }
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", person);
    socket.on("disconnect", () => {
      delete person[socket.id];
    });
    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("hey", {
        signal: data.signalData,
        from: data.from,
      });
    });
    socket.on("acceptCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
    */
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })

  // establishes what to do when the server receives a message
  socket.on("message", function(data){
    // send the message to all clients connected to the server to test if messages work.
    io.emit("message", {
      username: socket.username,
      message: data
    })
  });

  socket.on('disconnect', function() {
    console.log(socket.username + " has disconnected")
  })

  socket.on('DM', function(data){
    console.log(data, socket.username);
    const to = data.to, message = data.message;
    
    if (users.hasOwnProperty(to)) {
      users[to].emit('direct_message', {
        // senders username
        username : socket.username,
        // senders message
        message: message
      });

      users[socket.username].emit('direct_message', {
        to: to,
        username : socket.username,
        message: message
      });
    }
  })
})

db.once('open', () => {
  http.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});


