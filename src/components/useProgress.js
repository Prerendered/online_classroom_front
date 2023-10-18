import React, { useState, useEffect } from "react";
import axios from "axios";

import { CircularProgress, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const ViewTopic = ({ subjectName }) => {
  const [allRows, setAllRows] = useState([]);
  const [error, setError] = useState(null);
  const rows = subjectName
    ? allRows.filter((item) => item.subjectname === subjectName)
    : [];

  const totalTopics = rows.length;
  const completedTopics = rows.filter(
    (row) => String(row.TopicCompletion).toLowerCase() === "true"
  ).length;
  const progress = (completedTopics / totalTopics) * 100;

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

  return (
    <div>
      {/* Progress Label */}
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {`Completion: ${Math.round(progress)}%`}
      </Typography>
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: "10px", // Adjusts the thickness of the progress bar
          transition: "none", // Removes the animation
        }}
      />
    </div>
  );
};
export default ViewTopic;
