import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Forum } from '@mui/icons-material';

const TeacherPage = () => {
    const [answerData, setAnswerData] = useState({
        questionId: '',
        answer: '',
    });

    const [questions, setQuestions] = useState([]);

    // Function to fetch questions from the backend
    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/forum/getAll'); // Replace with your actual API endpoint

            if (response.ok) {
                const data = await response.json();

                // Filter questions without answers
                const questionList = data.filter(item => !item._answer);
                setQuestions(questionList);
            } else {
                console.error('Failed to fetch questions.');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    // Fetch questions when the component mounts
    useEffect(() => {
        fetchQuestions();
    }, []);

    const handlePostAnswer = async () => {
        try {
            // Send a PUT request to the backend API to update the answer
            const response = await fetch(`http://localhost:8080/api/forum/edit/answer/${answerData.questionId}/${answerData.answer}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // If the request was successful, update the questions state to remove the answered question
                setQuestions(questions.filter(question => question._id !== answerData.questionId));

                // Clear the answer input fields
                setAnswerData({
                    questionId: '',
                    answer: '',
                });
            } else {
                console.error('Failed to update the answer.');
            }
        } catch (error) {
            console.error('Error updating the answer:', error);
        }
    };

    return (
        <Container>
            {/* Display questions in a scrollable table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>_Title</TableCell>
                            <TableCell>_Question</TableCell>
                            <TableCell>_Category</TableCell>
                            <TableCell>_User</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question) => (
                            <TableRow key={question._id}>
                                <TableCell>{question._title}</TableCell>
                                <TableCell>{question._question}</TableCell>
                                <TableCell>{question._category}</TableCell>
                                <TableCell>{question._user}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setAnswerData({ questionId: question._id, answer: '' })}
                                    >
                                        Answer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Post Answer Section */}
            {answerData.questionId && (
                <div>
                    <TextField
                        label="Answer"
                        fullWidth
                        variant="outlined"
                        value={answerData.answer}
                        onChange={(e) => setAnswerData({ ...answerData, answer: e.target.value })}
                    />
                    <Button variant="contained" color="primary" onClick={handlePostAnswer}>
                        Post Answer
                    </Button>
                </div>
            )}

            <Forum questions={[]} answers={[]} /> {/* Placeholder for the Forum component */}
        </Container>
    );
};

export default TeacherPage;
