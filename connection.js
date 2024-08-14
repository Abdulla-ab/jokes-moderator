const mongoose = require('mongoose');
require('dotenv').config();


const submittedJokeDBUri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PWD}@${process.env.DATABASE_CLUSTER}.rcohl.mongodb.net/${process.env.JOKE_DATABASE_NAME}?retryWrites=true&w=majority`;
const deliverJokeDBUri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PWD}@${process.env.DATABASE_CLUSTER}.rcohl.mongodb.net/${process.env.MODERATOR_DATABSE_NAME}?retryWrites=true&w=majority`;

const submittedJokeDBConnection = mongoose.createConnection(submittedJokeDBUri, { useNewUrlParser: true, useUnifiedTopology: true });
const deliverJokeDBConnection = mongoose.createConnection(deliverJokeDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

submittedJokeDBConnection.on('connected', () => console.log('Connected to joke-app DB'));
submittedJokeDBConnection.on('error', (err) => console.error('joke-app DB connection error:', err));

deliverJokeDBConnection.on('connected', () => console.log('Connected to moderated-joke-app DB'));
deliverJokeDBConnection.on('error', (err) => console.error('moderated-joke-app DB connection error:', err));

module.exports = {
    submittedJokeDBConnection,
    deliverJokeDBConnection,
};
