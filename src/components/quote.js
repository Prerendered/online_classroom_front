import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const QuoteOfTheDay = () => {
    const category = "inspirational";

    const [quoteData, setQuote] = useState(null);

    const quoteAPI = () => {
        axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
            headers: { 'X-Api-Key': 'O6mG+R9hg1Sh85AX7rieHw==rLrMmujHyDQm9hWA' }
        })
        .then((response) => {
            // Assuming response.data contains the quote
            console.log(response.data);
            setQuote(response.data[0]);
        })
        .catch((error) => {
            console.error('Error', error);
            console.log("Error Request: ", error.request);
            console.log("Error Response: ", error.response);
        });
    };

    useEffect(() => {
        quoteAPI();
    }, []);

    return (
        <Box marginY={5}>
            <Paper elevation={4}>
                <Box padding={1}>
                    <Typography variant="h4" component="h3" align='left' fontWeight="bold">
                        Quote of the Day
                    </Typography>
                    {quoteData && (
                        <Box>
                            <Typography variant="body1" component="p" align='center' padding={5}>
                                {quoteData.quote}  
                            </Typography>

                            <Typography variant="body2" component="p" align='right'>
                            - {quoteData.author}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default QuoteOfTheDay;
