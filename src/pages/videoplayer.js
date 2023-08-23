import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CircularProgress } from '@mui/material';

const Video = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=JnTa9XtvmfI&key=AIzaSyCwFCtsVRp1947x3ljK41KSinRFvnzwUlc`
      );

      setVideo(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  if (!video) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card
        style={{
          width: '55%', // Adjust this for desired width
        }}
      >
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.snippet.title}
            frameBorder="0"
            allowFullScreen
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          ></iframe>
        </div>
      </Card>
    </div>
  );
};

export default Video;
