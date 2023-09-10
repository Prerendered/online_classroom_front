// This file adds the topics into a table to be then rendered in the subjectTable.js file.
// Data is fetched from the database and then added into an array to hold all the data at first.
// The data is then filtered to only show the topics that are related to the subject that the user clicked on.
// the subject name from topic table is the same as the subject name from subject table because the subject name is passed in as a prop from subject table
// the subject name is also stored as an entry in the topic collection in the database

// Param
// subjectName => name of subject (str) == subjectName
// allRows => [] => array of data from database, i.e, all data
// rows => [] => array of data after filtering
// id => id of subject (int) == row.id
// name => name of topic (str) == entry.topicName
// subjectname => name of subject (str) == entry.subjectName 

import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewTopic = ({ subjectName }) => {

  // Initialize rows as an empty array
  const [allRows, setAllRows] = useState([]); 

   // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v2/topics/getAll');
        const result = await response.json();

        const transformedRows = result.map((entry) => ({
          id: parseInt(entry._subjectID, 10),
          name: entry.topicName,
          subjectname: entry.subjectName 
        }));
        setAllRows(transformedRows); // Populate rows with fetched data, all data
      } catch (error) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
          </div>
        );
      }
    };
    fetchData();
  }, []);

  let rows; //initialize row used to filter data

  // Display topic name based on subject name into the table
  if (subjectName) {
    rows = allRows.filter(item => item.subjectname === subjectName);
  }
  
  const navigate = useNavigate();

  // take the name of the subject and passes it as the url. used to view videos in next page
  const handleClickOpen = (name) => {
    navigate(`/view-video/${name}`);
  };

  return (
    <TableContainer component={Paper} style={{
      alignItems: 'center',
      padding: '5%',
      borderRadius: 10,
    }}>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell style={{
                fontSize: '1rem',
              }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => handleClickOpen(row.name)}>View Video</Button>                           
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ViewTopic;
