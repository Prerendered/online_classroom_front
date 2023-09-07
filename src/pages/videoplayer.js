import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get name from url

// Mapping of subjects to YouTube video IDs; Static for now
// Change to get more videos, change to fetch ids from db instead
const subjectToVideoId = {
  'Sum': 'XJkIaw2e1Pw',
  'Division': 'yAJxHO7CLh4',
  'Substraction':'ug0gs8kLE48',
  'Multiplication': '6owKqFWej-w',
  'Division': 'KGMf314LUc0',
  'Factors': '0NvLtTwnUHs',
  'Perimeter': 'MTSlKifo4js', 
  'Area': 'JnLDmw3bbuw',
  'Ratio': 'bijxRsGF7fw',
};

const Video = () => {
  const [video, setVideo] = useState(null);

  const { name } = useParams(); // Getting the 'name' from the URL

  useEffect(() => {
    const videoId = subjectToVideoId[name]; // Look up video ID based on subject name

    if (videoId) {
      fetchVideo(videoId); // Fetch the corresponding video
    } else {
      console.error('No video ID found for subject:', name);
    }
  }, [name]); // Re-run the effect if 'name' changes

  // get video from youtube api
  const fetchVideo = async (videoId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyCwFCtsVRp1947x3ljK41KSinRFvnzwUlc`
      );

      setVideo(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // no video = infinite loading
  // change to round loading sphere
  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <iframe
          className="video-iframe"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.snippet.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
