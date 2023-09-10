// This file renders the video player onto the page. 
// Next to video player, exercises/questions are also rendered.
// if there is no videos, a loading circle is seen on screen.
// video is marked as completed, when user succesfully answers all questions.

// Param:
// name -> gets the name of the subject from the url (str)
// video -> video provided from youtube (str)
// videoId -> id of specific video; this is fetched using the name of the video (str)
// matchingRow -> row that matches the name of the video (str)
// allRows -> array of all the rows in the database (array)
// transformedRows -> array of all the rows in the database, but with the data transformed (array)
// TopicName -> name of the topic (str)
// subjectname -> name of the subject (str)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get name from url
import { Grid, Paper, TextField, Button, Typography, Card, CircularProgress } from '@mui/material';

const Video = () => {
  const [video, setVideo] = useState(null);
  const [allRows, setAllRows] = useState([]);
  const { name } = useParams(); // Getting the 'name' from the URL

   // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v2/topics/getAll');
        const result = await response.json();

        const transformedRows = result.map((entry) => ({
          id: parseInt(entry._subjectID, 10),
          TopicName: entry.topicName,
          subjectname: entry.subjectName,
          videoID: entry.videoID,
        }));
        setAllRows(transformedRows); // Populate rows with fetched data, all data
      } catch (error) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
          </div>
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const matchingRow = allRows.find(row => row.TopicName === name);
    if (matchingRow) {
      console.log(matchingRow.videoID);
      fetchVideo(matchingRow.videoID);
    }
  }, [allRows,name]); // Re-run the effect if 'name' and array allRows change

  // get video from youtube api
  const fetchVideo = async (videoId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyCwFCtsVRp1947x3ljK41KSinRFvnzwUlc`
      );

      setVideo(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // no video = infinite loading
  if (!video) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (

    // video player: positioning
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card
        style={{
          width: '55%', // Adjust this for desired width
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
      
      {/* Exercise Box */}
      <Grid item xs={12} md={4} paddingLeft={2} width={'35%'}>
        <Paper elevation={4} style={{ padding: '5%', }}>
            <Typography variant="h6" justifyContent={'left'}>Questions</Typography>
            {/* <Typography variant="body1" style={{ marginTop: '2%' }}>
                {questions.length > 0 ? questions[0].question : 'No questions available'}
            </Typography> */}
            <TextField
                name="question one"
                // label= {questions[0]}
                variant="outlined"
                margin="normal"
                fullWidth
                // onChange={handleAnswerChange}
                // value={givenAnswer}
            />
            <TextField
                name = "question two"
                // label= {questions[1]}
                variant="outlined"
                margin="normal"
                fullWidth
                // onChange={handleAnswerChange}
                // value={givenAnswer}
            />
            <TextField
                name = "question three"
                // label= {questions[1]}
                variant="outlined"
                margin="normal"
                fullWidth
                // onChange={handleAnswerChange}
                // value={givenAnswer}
            />
            <TextField
                name = "question four"
                // label= {questions[1]}
                variant="outlined"
                margin="normal"
                fullWidth
                // onChange={handleAnswerChange}
                // value={givenAnswer}
            />
            <TextField
                name = "question five"
                // label= {questions[1]}
                variant="outlined"
                margin="normal"
                fullWidth
                // onChange={handleAnswerChange}
                // value={givenAnswer}
            />

            <Button
                variant="contained"
                color="primary"
                // onClick={handleSubmit}
                style={{ marginTop: '16px' }}
            >
                Submit
            </Button>
        </Paper>
      </Grid> 

    </div>
  );
};

export default Video;
