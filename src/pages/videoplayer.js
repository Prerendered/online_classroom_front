import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
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
      const response = await axios.get('/api/questions');
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
    // Get the index of the current question
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
      <Grid container spacing={2} justifyContent="flex-end" paddingTop={"10%"} paddingLeft={4}>
        {/* Video Player */}
        {/* ... your video player code ... */}

        {/* Exercise Box */}
        <Grid item xs={12} md={4} paddingRight={2}>
          <Paper elevation={3} style={{ padding: '20px', paddingLeft: '60px' }}>
            <Typography variant="h6">Math Questions</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {questions.length > 0 ? questions[0].question : 'No questions available'}
            </Typography>
            <TextField
                name="answer"
                label="Answer"
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
