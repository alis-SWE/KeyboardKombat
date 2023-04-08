const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
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

const GameSchema = new Schema({
    text: [{type: String}],
    isOpen: {
        type: Boolean,
        default: true
    },
    isOver: {
        type: Boolean,
        default: false
    },
    players: [PlayerSchema],
    startTime: {type: Number}

}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);