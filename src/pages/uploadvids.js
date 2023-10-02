
import React, { useState } from 'react';
import { Box, Button, Grid, styled, Typography, TextField } from '@mui/material';

import '../App.css';
import Navbar from '../components/navbar.js';
import VidDetails from '../components/video_details.js';
import UploadArea from '../components/upload_area.js'

const UploadVideos = () => {
  
  return (
    <div>
      <Navbar />
      <Grid container sx={{ height: '90vh', justifyContent: 'center', alignItems: 'center' }}>

        <Grid item xs 
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'75%', margin: '2%',}}
        >
          <VidDetails/>
        </Grid>

        <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <UploadArea/>
        </Grid>

      </Grid>

    </div>
  );
};

export default UploadVideos;
