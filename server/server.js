const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// for some reason socket.io really wants this line of code, even if its entirely unnecessary for the rest of the server.
var http = require('http').createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

// connect socket.io to the server.
const io = require('socket.io')(http)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// establish the socket.io connect so that the engine is able to pass data to all others on the server.
var users = {}

io.on('connection', socket => {

  socket.on('sendNickname', function(username) {
    socket.username = username;
    users[username] = socket;
  });

  // establishes what to do when the server receives a message
  socket.on("message", function(data){
    // send the message to all clients connected to the server to test if messages work.
    io.emit("message", {
      username: socket.username,
      message: data
    })
  });

  socket.on('DM', function(data){
    console.log(data);
    const to = data.to, message = data.message;
    
    if (users.hasOwnProperty(to)) {
      users[to].emit('direct_message', {
        // senders username
        username : socket.username,
        // senders message
        message: message
      });
      users[socket.username].emit('direct_message', {
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