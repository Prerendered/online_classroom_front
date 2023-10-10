import React, { useState, useEffect } from "react";
import Exercise from "../components/exercises.js";
import { Card, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const CloudinaryPlayer = () => {
  const [allRows, setAllRows] = useState([]);
  const [srcUrl, setSrcUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { name } = useParams(); // Destructure 'name' from useParams

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v2/topics/getAll"
        );
        const result = await response.json();
        const transformedRows = result.map((entry) => ({
          objID: entry._id,
          id: parseInt(entry._subjectID, 10),
          TopicName: entry.topicName,
          subjectname: entry.subjectName,
          videoID: entry.videoID,
        }));
        setAllRows(transformedRows);
      } catch (error) {
        setError(error);
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // check if name from url match topic name from database
  useEffect(() => {
    const matchingRow = allRows.find((row) => row.TopicName === name);
    if (matchingRow) {
      fetchVideo(matchingRow.TopicName);
    }
  }, [allRows, name]);

  const fetchVideo = async (topicName) => {
    try {
      const newSrcUrl = `https://player.cloudinary.com/embed/?public_id=video/${topicName}&cloud_name=dalwgxr3j&source[info][title]=test&source[info][subtitle]=test&source[autoplayOnScroll]=false`;
      setSrcUrl(newSrcUrl);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Card
        style={{
          width: "55%",
        }}
      >
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
          }}
        >
          <iframe
            src={srcUrl}
            width="640"
            height="360"
            style={{ height: "auto", width: "100%", aspectRatio: "640 / 360" }}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            title="Cloudinary Video Player"
          ></iframe>
        </div>
      </Card>
      <Exercise />
    </div>
  );
};

export default CloudinaryPlayer;
