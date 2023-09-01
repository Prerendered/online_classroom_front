import React from 'react';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//Quote section where a quote of the day will be generated
const QuoteOfTheDay = () => {

    return (
        <Box marginY={5}>
        <Paper elevation={4}>
            <Box paddingX={1} paddingBottom={25}>
            <Typography variant="h4" component="h3" align='left' fontWeight="bold">Quote of the Day</Typography>
            </Box>
          </Paper>
          </Box>
    )
}
export default QuoteOfTheDay;