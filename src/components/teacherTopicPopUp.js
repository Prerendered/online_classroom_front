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
// completion => completion status of topic (str) == entry.topicCompletion
// completedRows => [] => array of data after filtering if topic is completed => if topic is in this array, the view video button is disabled for that topic

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom"; // Import useParams to get name from url
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ViewTopic = ({ subjectName }) => {
  // Initialize rows as an empty array
  const [allRows, setAllRows] = useState([]);
  const [isChecked, setIsChecked] = useState(false); // for completed/not completed switch
  const navigate = useNavigate();
  const { name } = useParams(); // Getting the 'name' from the URL

  // take the name of the subject and passes it as the url. used to view videos in next page
  const handleClickOpen = (name) => {
    navigate(`/upload-videos/${name}`);    
  };

  // Function to toggle the switch state
  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Fetch data from database to populate topics table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v2/topics/getAll"
        );
        const result = await response.json();

        const transformedRows = result.map((entry) => ({
          id: parseInt(entry._subjectID, 10),
          name: entry.topicName,
          subjectname: entry.subjectName,
          completion: entry.topicCompletion,
          checked: entry.topicCompletion === "True", // Assume topicCompletion is a string
        }));
        setAllRows(transformedRows); // Populate rows with fetched data, all data
      } catch (error) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <CircularProgress />
          </div>
        );
      }
    };
    fetchData();
  }, []);

  let rows; //initialize row used to filter data
  let completedRows; //initialize row used to filter data if topic is completed

  // Display topic name based on subject name into the table
  if (subjectName) {
    rows = allRows.filter((item) => item.subjectname === subjectName);
    completedRows = rows.filter((item) => item.completion === "True");
  }

  // Function to do change completion to true when the switch is checked
  const switchAction = async () => {
    if (isChecked) {
      const matchingRow = allRows.find((row) => row.TopicName === name);

      if (matchingRow) {
        const id = matchingRow.objID;
        const data = {
          SubjectName: matchingRow.subjectname,
          TopicName: matchingRow.TopicName,
          videoID: matchingRow.videoID,
          topicCompletion: "True",
        };
        axios
          .put(`http://localhost:8080/api/v2/topics/edit/${id}`, data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    return false;
  };

  useEffect(() => {
    switchAction();
  }, [isChecked]); // Dependency array to watch for changes in allRows
  
  return (
    <TableContainer
      component={Paper}
      style={{
        alignItems: "center",
        padding: "5%",
        borderRadius: 10,
      }}
    >
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                style={{
                  fontSize: "1rem",
                }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell align="right">
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={row.checked}
                      checked={row.checked}
                      onChange={ handleSwitchChange }
                      size="small"
                    />
                  }
                  label="Completed"
                />
                <Button
                  variant="outlined"
                  onClick={() => handleClickOpen(row.name)}
                >
                  Upload Video
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewTopic;

// Progress bar

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';

// export default function LinearBuffer() {
//   const [progress, setProgress] = React.useState(0);
//   const [buffer, setBuffer] = React.useState(10);

//   const progressRef = React.useRef(() => {});
//   React.useEffect(() => {
//     progressRef.current = () => {
//       if (progress > 100) {
//         setProgress(0);
//         setBuffer(10);
//       } else {
//         const diff = Math.random() * 10;
//         const diff2 = Math.random() * 10;
//         setProgress(progress + diff);
//         setBuffer(progress + diff + diff2);
//       }
//     };
//   });

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       progressRef.current();
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
//     </Box>
//   );
// }
