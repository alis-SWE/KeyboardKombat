require('dotenv').config();
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const Kombat = require('./models/Kombat');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const homeRoutes = require('./routes/home');
const practiceRoutes = require('./routes/practice');
const kombatRoutes = require('./routes/kombat');


//express
const app = express();

const expressServer = app.listen(PORT);
const io = socketio(expressServer, {
    cors: {
        origin: '*',
    }
});

app.use(express.json());
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

const db = mongoose.connection;
const books = db.model('Book', new mongoose.Schema({book: String, author: String, text: String}), 'book_texts');
const movies = db.model('Movie', new mongoose.Schema({movie: String, director: String, text: String}), 'movie_texts');

const getText = async (req, res) => {
    let randomCollection = Math.floor(Math.random() * 10);
    let randomSkip = Math.floor(Math.random() * 25);

    if (randomCollection >= 5) {
        const movie = await movies.findOne({}).skip(randomSkip);
        text = movie.text.split(" ");
        console.log(movie, randomCollection, randomSkip, text);
    }

    else {
        const book = await books.findOne({}).skip(randomSkip);
        text = book.text.split(" ");
        console.log(book, randomCollection, randomSkip, text);
    }

}

let text;

io.on('connect', (socket) => {
    socket.on('userInput', async ({ userInput, kombatID }) => {
        try {
            let kombat = await Kombat.findById(kombatID);
            if(!kombat.isOpen && !kombat.isOver) {
                let player = kombat.players.find(player => player.socketID === socket.id);
                let currentWord = kombat.text[player.wordIndex];
                if(currentWord === userInput) {
                    player.wordIndex++;
                    if(player.wordIndex !== kombat.text.length) {
                        kombat = await kombat.save();
                        io.to(kombatID).emit('updateKombat', kombat);
                    }
                    else {
                        let endTime = new Date().getTime();
                        let { startTime } = kombat;
                        player.wordsPerMinute = calculateWordsPerMinute(endTime, startTime, player);
                        kombat = await kombat.save();
                        socket.emit('done');
                        io.to(kombatID).emit('updateKombat', kombat);
                    }
                }
            }
        }
        catch(err) {
            console.log(err);
        }
    });

    socket.on('timer', async ({ kombatID, playerID }) => {
        let timer = 5;
        let kombat = await Kombat.findById(kombatID);
        let player = kombat.players.id(playerID);
        if(player.host) {
            let timerID = setInterval( async () => {
                if(timer >= 0) {
                    io.to(kombatID).emit('timer', {timer, msg: 'Starting Kombat'});
                    timer--;
                }
                else {
                    kombat.isOpen = false;
                    kombat = await kombat.save();
                    io.to(kombatID).emit('updateKombat', kombat);
                    startTimer(kombatID);
                    clearInterval(timerID);
                }
            }, 1000);
        }
    });

    socket.on('join-kombat', async ({kombatID: _id, name}) => {
        try {
            let kombat = await Kombat.findById(_id);
            if (kombat.isOpen) {
                const kombatID = kombat._id.toString();
                socket.join(kombatID);
                let player = {
                    socketID: socket.id,
                    name
                }
                kombat.players.push(player);
                kombat = await kombat.save();
                io.to(kombatID).emit('updateKombat', kombat);
            }
        }
        catch {
            console.log(err);
        }
    });

    socket.on('create-kombat', async (name) => {
        try {
            getText();
            let kombat = new Kombat();
            kombat.text = text;
            let player = {
                socketID: socket.id,
                host: true,
                name
            }
            kombat.players.push(player);
            kombat = await kombat.save();

            const kombatID = kombat._id.toString();
            socket.join(kombatID);
            io.to(kombatID).emit('updateKombat', kombat);
        }
        catch {
            console.log(err);
        }
    });
});

const startTimer = async (kombatID) => {
    let kombat = await Kombat.findById(kombatID);
    kombat.startTime = new Date().getTime();
    kombat = await kombat.save();
    let time = 30;
    let timerID = setInterval(function kombatInterval() {
        if(time >= 0) {
            io.to(kombatID).emit('timer', {timer: time, msg: "Time Remaining"});
            time--; 
        }
        else {
            (async () => {
                let endTime = new Date().getTime();
                let kombat = await Kombat.findById(kombatID);
                let { startTime } = kombat;
                kombat.isOver = true;
                kombat.players.forEach((player, index) => {
                    if(player.wordsPerMinute === -1) {
                        kombat.players[index].wordsPerMinute = calculateWordsPerMinute(endTime, startTime, player);
                    }
                });
                kombat = await kombat.save();
                io.to(kombatID).emit('updateKombat', kombat);
                clearInterval(timerID);
            })()
        }
        return kombatInterval;
    }(), 1000);
}

const calculateWordsPerMinute = (endTime, startTime, player) => {
    let numOfWords = player.wordIndex;
    const timeSec = (endTime - startTime) / 1000;
    const timeMin = timeSec / 60;
    const wordsPerMinute = Math.floor(numOfWords / timeMin);
    return wordsPerMinute;
}
