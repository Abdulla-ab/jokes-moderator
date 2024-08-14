const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { JokeModel, ModeratedJokeModel } = require('./module');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const authenticatedUser = { email: 'admin@admin.com', password: 'admin123' }; 

app.post('/login', (req,res) => {
    const { content } = req.body;
    const { email, password } = content;
    if (authenticatedUser.email != email || authenticatedUser.password != password) {
        return res.status(401).send('Unauthorized');
    }
    return res.status(200).send('SignIn Successful');
});

app.put('/jokes/:id', async (req,res) => {
    const { id } = req.params;
    const { content } = req.body;
    const { editedJoke, editedJokeType } = content;

    try {
        const updatedJoke = await JokeModel.findByIdAndUpdate(
            id,
            { joke: editedJoke, type: editedJokeType },
            { new: true, runValidators: true }
        );

        if (!updatedJoke) {
            return res.status(404).send('Joke Not Found');
        }

        res.status(201).json(updatedJoke);
    } catch (error) {
        console.error('Error updating the joke: ', error);
        res.status(500).send("Error updating joke");
    }
});

app.post('/jokes/approve', async (req, res) => {
    const { content } = req.body;
    const { id, joke, type } = content;

    try {
        await JokeModel.deleteOne({ _id: id }).exec();
        const newApprovedJoke = new ModeratedJokeModel({ joke, type });
        const jokeToDeliverService = await newApprovedJoke.save();

        res.status(201).json(jokeToDeliverService);
    } catch (error) {
        console.error('Error saving joke:', error);
        res.status(500).send('Error saving joke');
    }
})

app.delete('/jokes/:id', async (req, res) => {
    const { id } = req.params;
    const result = await JokeModel.deleteOne({ _id: id }).exec();
    return res.status(202).send(result.deletedCount > 0);
})

app.listen(process.env.PORT, () => {
    console.log(`Moderate Jokes Service running on port ${process.env.PORT}`);
});


