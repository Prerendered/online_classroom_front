// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000; // Set your desired port

mongoose.connect('mongodb://localhost:27017/exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Exercise = mongoose.model('Exercise', {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
