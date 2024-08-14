const mongoose = require('mongoose');
const { submittedJokeDBConnection, deliverJokeDBConnection } = require('./connection');

const JokeSchema = new mongoose.Schema({
    joke: String,
    type: String
});

const JokeModel = submittedJokeDBConnection.model('jokes', JokeSchema);

const ModeratedJokeSchema = new mongoose.Schema({
    joke: String,
    type: String
});

const ModeratedJokeModel = deliverJokeDBConnection.model('moderatedjokes', ModeratedJokeSchema);

module.exports = {
    JokeModel,
    ModeratedJokeModel
}