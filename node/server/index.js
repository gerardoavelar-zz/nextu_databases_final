const http = require('http');
      path = require('path'),
      express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      MongoClient = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      connection = mongoose.connect('mongodb://localhost/agenda_db', {useMongoClient: true}, function(error){ //Connect with DB
           if(error) {
           	 console.log(error.name +" "+ error.message); // Error msg
           } else {
              console.log('Conectado a MongoDB'); // Success
           }
        });


const RoutingUsers = require('./rutasUsuarios.js'), // User routes
      RoutingEvents = require('./rutasEventos.js') // Event routes
const PORT = 3000
const app = express()
const Server = http.createServer(app)

app.use(express.static('../client')) // Define client directory as root
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
    secret: 'secret-pass',
    cookie: { maxAge: 3600000 }, // Keep cookies for 60 min.
    resave: false,
    saveUninitialized: true,
  }));

app.use('/usuarios', RoutingUsers) // Define users directory as root for users module
app.use('/events', RoutingEvents) // Define events directory as root for events module

Server.listen(PORT, function() { // Start server
  console.log('Servidor escuchando por el puerto: ' + PORT)
})
