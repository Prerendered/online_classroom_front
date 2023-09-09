import React, { useState, useEffect } from 'react';
import '../App.css';
import '../components/navbar.js';
import '../components/navbar.css';
import axios from 'axios';
import {
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
    Card,
} from '@mui/material';

const Video = () => {
    const [video, setVideo] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [givenAnswer, setGivenAnswer] = useState('');

    useEffect(() => {
        fetchVideo();
        fetchQuestions();
        fetchAnswers();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('/api/questions' );
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const fetchAnswers = async () => {
        try {
            const response = await axios.get('/api/answers');
            setAnswers(response.data);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };
    const fetchVideo = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=JnTa9XtvmfI&key=AIzaSyCwFCtsVRp1947x3ljK41KSinRFvnzwUlc`
            );

            setVideo(response.data.items[0]);
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    const handleAnswerChange = (event) => {
        setGivenAnswer(event.target.value);
    };

    const handleSubmit = () => {
        const questionIndex = questions.findIndex(
            (question) => question.question === questions[0].question
        );

        if (questionIndex !== -1) {
            const correctAnswer = answers[questionIndex].answer;
            if (givenAnswer === correctAnswer) {
                alert('Your answer is correct!');
            } else {
                alert('Your answer is incorrect. Please try again.');
            }
        } else {
            alert('No questions found.');
        }
    };

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={0.5} justifyContent="Center" paddingTop={"3%"} paddingLeft={6}>
            {/* Video Player */}
            <Grid item xs={12} md={8}>
                <Card
                    style={{
                        width: '85%', // Adjust this for desired width
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            paddingBottom: '56.25%', // 16:9 aspect ratio
                            height: 0,
                            overflow: 'hidden',
                        }}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.snippet.title}
                            frameBorder="0"
                            allowFullScreen
                            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                        ></iframe>
                    </div>
                </Card>
            </Grid>

            {/* Exercise Box */}
            <Grid item xs={12} md={4} paddingRight={1}>
                <Paper elevation={3} style={{ padding: '10%', paddingLeft: '10%' }}>
                    <Typography variant="h6">Math Questions</Typography>
                    <Typography variant="body1" style={{ marginTop: '2%' }}>
                        {questions.length > 0 ? questions[0].question : 'No questions available'}
                    </Typography>
                    <TextField
                        name="question one"
                        label= {questions[0]}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={handleAnswerChange}
                        value={givenAnswer}
                    />
                    <TextField
                        name = "question two"
                        label= {questions[1]}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={handleAnswerChange}
                        value={givenAnswer}
                    />
                    <TextField
                        name = "question three"
                        label= {questions[1]}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={handleAnswerChange}
                        value={givenAnswer}
                    />
                    <TextField
                        name = "question four"
                        label= {questions[1]}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={handleAnswerChange}
                        value={givenAnswer}
                    />
                    <TextField
                        name = "question five"
                        label= {questions[1]}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={handleAnswerChange}
                        value={givenAnswer}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: '16px' }}
                    >
                        Submit
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Video;
