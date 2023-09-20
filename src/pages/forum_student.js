import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Forum } from '@mui/icons-material';

const StudentPage = () => {
    const [questionData, setQuestionData] = useState({
        title: '',
        question: '',
        answer: '',
        category: '',
        user: '',
    });

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    // Function to fetch questions and answers from the backend
    const fetchQuestionsAndAnswers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/forum/getAll'); // Replace with your actual API endpoint

            if (response.ok) {
                const data = await response.json();

                // Separate questions and answers based on the "answer" field
                const questionList = data.filter(item => !item.answer);
                const answerList = data.filter(item => !!item.answer);

                setQuestions(questionList);
                setAnswers(answerList);
            } else {
                console.error('Failed to fetch questions and answers.');
            }
        } catch (error) {
            console.error('Error fetching questions and answers:', error);
        }
    };

    // Fetch questions and answers when the component mounts
    useEffect(() => {
        fetchQuestionsAndAnswers();
    }, []);

    const handleSubmitQuestion = async () => {
        try {
            // Send a POST request to the backend API
            const response = await fetch('http://localhost:8080/api/forum/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(questionData),
            });

            if (response.ok) {
                // If the request was successful, update the 'questions' state with the new question
                const newQuestion = await response.json();
                setQuestions([...questions, newQuestion]);

                // Clear the question input fields
                setQuestionData({
                    title: '',
                    question: '',
                    answer: '',
                    category: '',
                    user: '',
                });
            } else {
                console.error('Failed to post the question.');
            }
        } catch (error) {
            console.error('Error posting the question:', error);
        }
    };

    return (
        <Container>


            {/* Display questions and answers in a scrollable table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>User</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question) => (
                            <TableRow key={question._id}>
                                <TableCell>{question._title}</TableCell>
                                <TableCell>{question._question}</TableCell>
                                <TableCell>{question._answer}</TableCell>
                                <TableCell>{question._category}</TableCell>
                                <TableCell>{question._user}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Forum questions={questions} answers={answers} />
            <TextField
                label="Title"
                fullWidth
                variant="outlined"
                value={questionData.title}
                onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
            />
            <TextField
                label="Question"
                fullWidth
                variant="outlined"
                value={questionData.question}
                onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
            />

            <TextField
                label="Category"
                fullWidth
                variant="outlined"
                value={questionData.category}
                onChange={(e) => setQuestionData({ ...questionData, category: e.target.value })}
            />
            <TextField
                label="User"
                fullWidth
                variant="outlined"
                value={questionData.user}
                onChange={(e) => setQuestionData({ ...questionData, user: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleSubmitQuestion}>
                Post Question
            </Button>


        </Container>
    );
};

export default StudentPage;
