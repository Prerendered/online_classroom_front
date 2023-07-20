import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
