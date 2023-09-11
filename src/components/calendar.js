import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper } from '@mui/material';

//Calendar when messages will be implemented
export default function BasicDateCalendar() {

  return (
    <Paper style={{
      borderRadius: 10,
      backgroundColor: 'white',
      boxShadow: 3,
      margin: 0,
    }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar style={{
    width: '100%',
  }}/>
    </LocalizationProvider>
    </Paper>
  );
}
