// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001; // Set your desired port

// Connect to MongoDB


mongoose.connect('mongodb://localhost:27017/exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Exercise = mongoose.model('exercises', {
    question: String,
    answer: String,
});

app.use(express.json());
app.use(cors());

app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Exercise.find({}, 'question');
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Error fetching questions' });
    }
});

app.get('/api/answers', async (req, res) => {
    try {
        const answers = await Exercise.find({}, 'answer');
        res.json(answers);
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ error: 'Error fetching answers' });
    }
});

// Create an API endpoint to submit a question and answer
app.post('/api/submit', (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ error: 'Both question and answer are required.' });
    }

    // Log the question to the console
    console.log('Received Question:', question);

    // You can also save the question and answer to the database here if needed
    // For example:
    // const exercise = new Exercise({ question, answer });
    // exercise.save();

    return res.status(200).json({ message: 'Question received successfully.' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
