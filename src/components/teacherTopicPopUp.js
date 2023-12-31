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

import { useNavigate } from "react-router-dom"; // Import useParams to get name from url
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
  const [allRows, setAllRows] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClickOpen = (name) => {
    navigate(`/upload-videos/${name}`);
  };

  const handleSwitchChange = async (event, id) => {
    const isChecked = event.target.checked;
    const matchingRow = allRows.find((row) => row.id === id);
    if (matchingRow) {
      const data = {
        SubjectName: matchingRow.subjectname,
        TopicName: matchingRow.name,
        TopicCompletion: isChecked,
      };

      try {
        await axios
          .put(`http://localhost:8080/api/v2/topics/edit/${id}`, data)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        // Update the frontend state
        const updatedRows = allRows.map((row) =>
          row.id === id ? { ...row, TopicCompletion: isChecked } : row
        );
        setAllRows(updatedRows);
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v2/topics/getAll"
        );
        const transformedRows = response.data.map((entry) => ({
          id: entry._id,
          name: entry.topicName,
          subjectname: entry.subjectName,
          TopicCompletion: entry.topicCompletion,
        }));
        console.log("fetching data", transformedRows);
        setAllRows(transformedRows);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
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

  const rows = subjectName
    ? allRows.filter((item) => item.subjectname === subjectName)
    : [];

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
            <TableRow key={row.id}>
              <TableCell
                style={{ fontSize: "1rem" }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell align="right">
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={
                        String(row.TopicCompletion).toLowerCase() === "true"
                      }
                      onChange={(event) => handleSwitchChange(event, row.id)}
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
