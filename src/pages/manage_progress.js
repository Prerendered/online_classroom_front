import React from 'react';
import './manage_progress.css';
import Navbar from '../components/navbar.js';
import  SubjectDisplay from "../components/progress_subject_display.js";
import DataTable from "../components/weekly_topics.js";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";

function App() {
    return (
        <div>
        <Navbar/>
        <Container>
            <Grid container spacing={5} paddingTop={4}>
                <SubjectDisplay/>
            </Grid>

            <Grid container spacing={5} paddingTop={10} paddingX={4}>
                <DataTable/>
            </Grid>
        </Container>

        </div>
    );
}
export default App;