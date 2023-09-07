import React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams to get name from url

const Subtitle = () => {
  const { name } = useParams(); // Get the name from URL

  return (
    <Typography variant="h2" component="h2" align="left" style={{ marginLeft: '22%', marginTop: '1%', }}>
      {name}  {/* name taken from url*/}
    </Typography>
  );
};

export default Subtitle;
