import React, { useState, useEffect } from 'react';
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
    TablePagination,
    DialogActions,
    TableSortLabel,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { Forum as ForumIcon, Add as AddIcon } from '@mui/icons-material';
import Layout from './Layout.js'; // Import the common layout component

const StudentPage = () => {
    const [questionData, setQuestionData] = useState({
        title: '',
        question: '',
        answer: '',
        category: '',
        user: '',
    });

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [orderBy, setOrderBy] = useState(''); // State variable to store the current column to sort by
    const [order, setOrder] = useState('asc'); // State variable to store the sorting order
    const [filter, setFilter] = useState(''); // State variable to store the filter value

    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(''); // Track selected category for sorting
    const [categories, setCategories] = useState([]);

    const handleOpenCategoryDialog = async () => {
        try {
            // Fetch the list of categories from the backend
            const response = await fetch('http://localhost:8080/api/forum/search/category'); // Use the correct endpoint
            if (response.ok) {
                const data = await response.json();
                setCategories(data.categories); // Assuming 'data' is an object with a 'categories' property containing the array of categories
                setCategoryDialogOpen(true);
            } else {
                console.error('Failed to fetch categories from the backend.');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const handleCloseCategoryDialog = () => {
        setCategoryDialogOpen(false);
    };

    const handleSortByCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/forum/search/category/${selectedCategory}`);
            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                console.error('Failed to sort questions by category.');
            }
        } catch (error) {
            console.error('Error sorting questions by category:', error);
        }

        setCategoryDialogOpen(false);
    };



    // Function to fetch questions and answers from the backend
    const fetchQuestionsAndAnswers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/forum/getAll'); // Replace with your actual API endpoint

            if (response.ok) {
                const data = await response.json();

                // Set the questions directly without filtering initially
                setQuestions(data);
                // Separate answers if needed
                const answerList = data.filter(item => !!item.answer);
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
        <Layout>
            <Container>
                <div>
                    <ForumIcon sx={{ fontSize: 48, color: 'primary' }} />
                    <h2>Online Forum</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    {/* Add a button to open the category sorting dialog */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenCategoryDialog}
                    >
                        Sort by Category
                    </Button>
                    <TableContainer component={Paper} style={{ minWidth: 800, maxHeight: 500 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f2f2f2', color: '#333', fontWeight: 'bold', borderBottom: '2px solid #ddd', }}>
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
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={questions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                <ForumIcon sx={{ fontSize: 48, color: 'primary' }} />
                <h2>Ask a Question</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                    startIcon={<AddIcon />}
                >
                    Ask a Question
                </Button>

                {/* Dialog for asking a question */}
                <Dialog open={isDialogOpen} onClose={handleCloseDialog} sx={{ margin: '2%', padding: '2%', paddingTop: '5%' }}>
                    <DialogTitle>Ask a Question</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            fullWidth
                            variant="outlined"
                            value={questionData.title}
                            onChange={(e) => setQuestionData({ ...questionData, title: e.target.value })}
                        />
                        <TextField
                            label="Your Question"
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
                            label="Your Name"
                            fullWidth
                            variant="outlined"
                            value={questionData.user}
                            onChange={(e) => setQuestionData({ ...questionData, user: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitQuestion} color="primary">
                            Ask
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Category Sorting Dialog */}
                <Dialog open={isCategoryDialogOpen} onClose={handleCloseCategoryDialog}>
                    <DialogTitle>Sort by Category</DialogTitle>
                    <DialogContent>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Category</FormLabel>
                            <RadioGroup
                                aria-label="category"
                                name="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <FormControlLabel value="" control={<Radio />} label="All" />
                                {/* Fetch the categories from the database and map them to Radio buttons */}
                                {categories.map((category) => (
                                    <FormControlLabel
                                        key={category}
                                        value={category}
                                        control={<Radio />}
                                        label={category}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCategoryDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSortByCategory} color="primary">
                            Sort
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Layout>
    );
};

export default StudentPage;
