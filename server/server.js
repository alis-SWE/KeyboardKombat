require('dotenv').config();
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const Game = require('./models/Game');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const homeRoutes = require('./routes/home');
const practiceRoutes = require('./routes/practice');
const kombatRoutes = require('./routes/kombat');

//express
const app = express();

const expressServer = app.listen(PORT);
const io = socketio(expressServer);

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
});

app.use('/', homeRoutes);
app.use('/practice', practiceRoutes);
app.use('/kombat', kombatRoutes);

//connect to db
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to DB & Listening on PORT ', PORT);
    })
    .catch((error) => {
        console.log(error);
    })

