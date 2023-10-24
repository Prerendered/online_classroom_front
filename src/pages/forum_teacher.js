import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import Layout from "./Layout.js"; // Import the common layout component

const TeacherPage = () => {
  const [answerData, setAnswerData] = useState({
    questionId: "",
    answer: "",
    question: "",
  });

  const [questions, setQuestions] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [isAnswerDialogOpen, setAnswerDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  // Function to fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/forum/getAll"); // Replace with your actual API endpoint

      if (response.ok) {
        const data = await response.json();
        setQuestions(data);

        // Filter questions without answers
        const unanswered = data.filter((item) => !item._answer);
        setUnansweredQuestions(unanswered);
      } else {
        console.error("Failed to fetch questions.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Fetch questions when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handlePostAnswer = async () => {
    try {
      // Send a PUT request to the backend API to update the answer
      const response = await fetch(
        `http://localhost:8080/api/forum/edit/answer/${answerData.questionId}/${answerData.answer}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // If the request was successful, update the questions state to remove the answered question
        setQuestions(
          questions.filter((question) => question._id !== answerData.questionId)
        );

        // Clear the answer input fields
        setAnswerData({
          questionId: "",
          answer: "",
        });
      } else {
        console.error("Failed to update the answer.");
      }
    } catch (error) {
      console.error("Error updating the answer:", error);
    }
  };
  const handleDeleteQuestion = async (questionId) => {
    try {
      // Send a DELETE request to the backend API to delete the question
      const response = await fetch(
        `http://localhost:8080/api/forum/delete/${questionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the request was successful, update the questions state to remove the deleted question
        setQuestions(
          questions.filter((question) => question._id !== questionId)
        );

        // Close the delete dialog
        setDeleteDialogOpen(false);
      } else {
        console.error("Failed to delete the question.");
      }
    } catch (error) {
      console.error("Error deleting the question:", error);
    }
  };

  const handlePostAnswerClick = (questionId, question) => {
    setAnswerData({ questionId, answer: "", question });
    setAnswerDialogOpen(true);
  };

  const handleDeleteQuestionClick = (questionId) => {
    setQuestionToDelete(questionId);
    setDeleteDialogOpen(true);
  };

  const handleViewForum = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseAnswerDialog = () => {
    setAnswerDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Layout>
      <Container style={{ paddingTop: '100px' }}>
        {/* Display questions in a scrollable table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                borderBottom: "2px solid #ddd",
              }}
            >
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unansweredQuestions.map((question) => (
                <TableRow key={question._id}>
                  <TableCell>{question._title}</TableCell>
                  <TableCell>{question._question}</TableCell>
                  <TableCell>{question._category}</TableCell>
                  <TableCell>{question._user}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handlePostAnswerClick(question._id, question._question)
                      }
                    >
                      Answer
                    </Button>
                    <Button
                      style={{ marginLeft: "2px", backgroundColor: "#ff0000" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteQuestionClick(question._id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Post Answer Section */}
        {answerData.questionId && (
          <Dialog
            open={isAnswerDialogOpen}
            onClose={handleCloseAnswerDialog}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>Post Answer</DialogTitle>
            <DialogContent>
              <p>Question: {answerData.question}</p>
              <TextField
                label="Answer"
                fullWidth
                variant="outlined"
                value={answerData.answer}
                onChange={(e) =>
                  setAnswerData({ ...answerData, answer: e.target.value })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePostAnswer}
              >
                Post Answer
              </Button>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Question Confirmation Dialog */}
        {questionToDelete && (
          <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete this question?</p>
              <Button
                style={{ marginRight: "2px", backgroundColor: "#ff0000" }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleDeleteQuestion(questionToDelete);
                  setDeleteDialogOpen(false);
                }}
              >
                Yes, Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseDeleteDialog}
              >
                Cancel
              </Button>
            </DialogContent>
          </Dialog>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleViewForum}
          startIcon={<VisibilityIcon />}
          style={{ marginTop: "16px" }}
        >
          View Whole Forum
        </Button>

        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>Whole Forum</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: "#f2f2f2",
                    color: "#333",
                    fontWeight: "bold",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question._id}>
                      <TableCell>{question._question}</TableCell>
                      <TableCell>{question._category}</TableCell>
                      <TableCell>{question._user}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handlePostAnswerClick(
                              question._id,
                              question._question
                            )
                          }
                        >
                          Answer
                        </Button>
                        <Button
                          style={{
                            marginLeft: "2px",
                            backgroundColor: "#ff0000",
                          }}
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleDeleteQuestionClick(question._id)
                          }
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default TeacherPage;
