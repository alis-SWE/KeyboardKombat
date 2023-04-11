const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    wordIndex : {
        type: Number,
        default: 0
    },
    socketID: {
        type: String
    },
    host: {
        type: Boolean,
        default: false
    },
    wordsPerMinute: {
        type: Number,
        default: -1
    }
});

const kombatSchema = new Schema({
    text: [{type: String}],
    isOpen: {
        type: Boolean,
        default: true
    },
    isOver: {
        type: Boolean,
        default: false
    },
    players: [playerSchema],
    startTime: {type: Number}
});

module.exports = mongoose.model('Kombat', kombatSchema);