import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider, linearProgressClasses, styled} from "@mui/material";

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {variant: "body3"},
                    style: {
                        fontSize: 9,
                    },
                },

                {
                    props: {variant: "heading"},
                    style: {
                        fontSize: 45,
                        fontFamily: 'Montserrat',
                        fontWeight: '700',
                        wordSpacing: '4.5em',
                        wordWrap: 'break-word',
                        color: 'white'
                    }
                }
            ],
        },
    },
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 42,
    borderRadius: 5,
        border: '1.50px black solid',
    paddingLeft: 2,

    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        border: '2.50px white solid',


        backgroundColor: theme.palette.mode === 'light' ? '#00ADB5' : '#00ADB5',
    },
}));

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>

                <Box paddingX={1} >
                    <Typography variant="heading" >
                        {`Math ${Math.round(
                        props.value,
                    )}%Done` }</Typography>
                </Box>
                <Box paddingX={1} sx={{ display: 'flex', alignItems: 'center', height: 120 /* Adjust the height here */ }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <BorderLinearProgress variant="determinate" {...props} />
                    </Box>

                </Box>

            </Box>

        </ThemeProvider>
    );
}

export default function LinearWithValueLabel(props: LinearProgressProps & { value: number }) {
    const constantPercentage = 75; // Replace this with your desired constant value

    return (
        <Box sx={{ flexGrow: 1 }}>
            <LinearProgressWithLabel variant="determinate" value={constantPercentage} />
        </Box>
    );
}