// import { useEffect, useRef } from "react";

// const VideoPlayer = () => {
//   const videoRef = useRef();
//   const cloudinaryRef = useRef();

//   // Store the Cloudinary window instance to a ref when the page renders

//   useEffect(() => {
//     if (cloudinaryRef.current) return;

//     cloudinaryRef.current = window.cloudinary;

//     cloudinaryRef.current.videoPlayer(videoRef.current, {
//       cloud_name: "dalwgxr3j",
//     });
//   }, []);

//   return (
//     <video ref={videoRef} data-cld-public-id="pyvblvtlmnvxr8ghljgx"></video>
//   );
// };

// export default VideoPlayer;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Exercise from "../components/exercises.js";
import {
  Grid,
  Card,
  CircularProgress,
} from "@mui/material";
import 'cloudinary-video-player/dist/cld-video-player.min.css';  // Import Cloudinary Video Player styles

const Video = () => {
  const [video, setVideo] = useState(null);
  const [allRows, setAllRows] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // ... rest of your code
    };
    fetchData();
  }, []);

  useEffect(() => {
    const matchingRow = allRows.find((row) => row.TopicName === name);
    if (matchingRow) {
      fetchVideo(matchingRow.videoID);
    }
  }, [allRows, name]);

  const fetchVideo = async (videoId) => {
    // This function assumes that videoId is the public_id of the video on Cloudinary
    setVideo(videoId);
  };

  if (!video) {
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
          <div id="video-player" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}></div>
        </div>
      </Card>
      <Exercise />
    </div>
  );
};

export default Video;

// Then, in a useEffect hook or in a function that runs after the component mounts, initialize the Cloudinary Video Player:
useEffect(() => {
  if (video) {
    const player = window.cloudinary.VideoPlayer('video-player', { cloudName: 'your-cloud-name' });
    player.source(video, { sourceTypes: ['mp4'] });
  }
}, [video]);

