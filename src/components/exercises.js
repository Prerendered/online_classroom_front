import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "../components/navbar.js";
import "../components/navbar.css";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams to get name from url

const Exercise = () => {
  const [video, setVideo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]); // Store correct answers from the database
  const [topicName, setTopicName] = useState(""); // Store the topic name from the database
  const [givenAnswers, setGivenAnswers] = useState([]); // Store user answers separately
  const [allRows, setAllRows] = useState([]);
  const { name } = useParams(); // Getting the 'name' from the URL

  // Define the sleep function
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false); // for answer verification

  useEffect(() => {
    fetchVideo();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/exercises/getAll"
      );
      const result = await response.json();

      const transformedRows = result.map((entry) => ({
        id: entry._id,
        Question: entry._question,
        Answer: entry._answer,
        TopicName: entry.subject,
        Status: entry.completed,
      }));

      // Extract all questions and put them in an array
      const allQuestions = transformedRows
        .filter((row) => row.TopicName === "Math")
        .map((row) => row.Question);

      setQuestions(allQuestions);

      // Populate the answers state with correct answers
      const correctAnswers = allQuestions.map(
        (question) =>
          transformedRows.find((row) => row.Question === question)?.Answer || ""
      );
      setAnswers(correctAnswers);

      // Initialize user answers as empty strings
      setGivenAnswers(allQuestions.map(() => ""));

      // Get the topicName from the first row (assuming all rows have the same topic)
      if (transformedRows.length > 0) {
        setTopicName(transformedRows[0].TopicName);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      // Replace with dynamic video ID or fetch from a data source
      const videoId = "JnTa9XtvmfI";
      setVideo(videoId);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const handleAnswerChange = (event, index) => {
    // Update the corresponding answer in the givenAnswers array
    const updatedGivenAnswers = [...givenAnswers];
    updatedGivenAnswers[index] = event.target.value;
    setGivenAnswers(updatedGivenAnswers);
  };

  // Function to do change completion to true when the checkbox is checked
  const checkboxAction = async () => {
    if (isChecked) {
      const matchingRow = allRows.find((row) => row.TopicName === name);
  
      if (matchingRow) {
        const id = matchingRow.objID;
        const data = {
          SubjectName: matchingRow.subjectname,
          TopicName: matchingRow.TopicName,
          videoID: matchingRow.videoID,
          topicCompletion: "True", // Set topicCompletion to "True"
        };

        
        console.log('BANANANA',data);

        axios
          .put(`http://localhost:8080/api/v2/topics/edit/${id}`, data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
  
      // Sleep for 1 second before navigating back
      await sleep(1000);
      navigate(`/student-dashboard`);
    }
    return false;
  };

//   useEffect(() => {
//     checkboxAction(); // You can call this function wherever you need the checkbox state
//   }, [isChecked]); // Dependency array to watch changes to `isChecked`

  const handleSubmit = async () => {
    // Compare each user answer with the correct answer
    const results = questions.map((question, index) => {
      return {
        question: question,
        userAnswer: givenAnswers[index],
        correctAnswer: answers[index],
      };
    });

    // Check if all answers are correct
    const allCorrect = results.every(
      (result) => result.userAnswer === result.correctAnswer
    );

    // Display a single summary alert
    if (allCorrect) {
      alert("All your answers are correct!");
      setIsChecked(true);
      console.log('BANANANA----------->', isChecked);
      await checkboxAction();
    } else {
      const incorrectAnswers = results.filter(
        (result) => result.userAnswer !== result.correctAnswer
      );
      const incorrectQuestions = incorrectAnswers.map(
        (result) => result.question
      );
      const correctAnswers = results.filter(
        (result) => result.userAnswer === result.correctAnswer
      );

      let message = "Your answers are incorrect for the following questions:\n";
      incorrectQuestions.forEach((question) => {
        message += `"${question}"\n`;
      });

      message += "\nYour answers are correct for the following questions:\n";
      correctAnswers.forEach((result) => {
        message += `"${result.question}"\n`;
      });

      alert(message);
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      spacing={0.5}
      justifyContent="Center"
      paddingTop={"3%"}
      paddingLeft={6}
    >
      {/* Exercise Box */}
      <Grid item xs={12} md={4} paddingRight={1}>
        <Paper elevation={3} style={{ padding: "10%", paddingLeft: "10%" }}>
          <Typography variant="h6">{topicName} Questions</Typography>
          {questions.map((question, index) => (
            <div key={index}>
              <Typography
                variant="body1"
                style={{ marginTop: "2%" }}
              ></Typography>
              <TextField
                name={`question-${index}`}
                label={`Answer for ${question}`}
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(event) => handleAnswerChange(event, index)}
                value={givenAnswers[index]}
              />
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Exercise;
