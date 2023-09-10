// This is the main file to render the subjects data grid/table
// The file connects to the spring boot endpoints using fetch. The spring boot app is concerned with connecting to the mongoDB database and fetching correct data.
// Data obtained from db is in .json format.
// The .json items are dealt with and added into rows.

// Param
// rows => []
// id => id of subject (int) == row.id
// name => name of subject (str) == row.name

import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ViewTopic from './topic_popups';


//table containing the subject that the students can get access to
const SubjectsTable = () => {

    // Data fetched from database
    const [rows, setRows] = useState([]); // Initialize rows as an empty array

    useEffect(() => {
        // Fetch data from database
        async function fetchData() {
        try {
            const response = await fetch('http://localhost:8080/api/v2/subjects/getAll');
            const result = await response.json();

            const transformedRows = result.map((entry) => ({
            id: parseInt(entry._subjectID, 10),
            name: entry.subjectName
            }));

            setRows(transformedRows); // Populate rows with fetched data
        } catch (error) {
            console.error("There was a problem fetching data", error);
        }
        }
        fetchData();
    }, []);

    const [open, setOpen] = React.useState(false);
    const [subjectName, setSelectedSubject] = React.useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md')); // for dialog
    
    //pass in row.name into this
    const handleClickOpen = (subjectName) => {
        setSelectedSubject(subjectName);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <TableContainer component={Paper} style={{
            alignItems: 'center',
            float: 'left',
            padding: '5%',
            margin: '0.2%',
            borderRadius: 10,
            height: '93%',
          }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell 
                            style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                            }}>
                                Your Courses
                        </TableCell>
                        <TableCell align="right"></TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" onClick={() => handleClickOpen(row.name)}>Choose Topics</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
            </Table>

            <Dialog
                maxWidth='md'
                fullWidth={true}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.25)' // set the background opacity when dialog is up
                    }
                }}
            >
                <DialogTitle id="responsive-dialog-title" style={{fontWeight:'bold', fontSize:'2rem'}}>
                    {"Topics:"}
                </DialogTitle>
                <DialogContent>
                    <ViewTopic subjectName={subjectName} /> {/* send name of subject to view topic*/}
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>

    )
};

export default SubjectsTable;
