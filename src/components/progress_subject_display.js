import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from '@mui/material/styles';
import LinearWithValueLabel from './progress_bar';

const theme = createTheme({
    // You can define your custom theme here if needed
});

const SubjectDisplay = () => {
    return (
        <Grid item xs={5}>
            <ThemeProvider theme={theme}>
                <StyledThemeProvider
                    theme={(theme) => ({
                        ...theme,
                        components: {
                            MuiPaper: {
                                styleOverrides: {
                                    root: {
                                        width: 541,
                                        height: 167,
                                        background: '#393E46',
                                        boxShadow: '-11px 11px 5px -6px rgba(0, 0, 0, 0.75)',
                                        borderRadius: 1,
                                    },
                                },
                            },
                        },
                    })}
                >
                    <Paper elevation={3}>
                        <LinearWithValueLabel />
                    </Paper>
                </StyledThemeProvider>
            </ThemeProvider>
        </Grid>
    );
};

export default SubjectDisplay;