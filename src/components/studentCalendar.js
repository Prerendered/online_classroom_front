import * as React from "react";
import { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Paper } from "@mui/material";

export default function StudentCalendar() {
  const [calendar, setCalendarData] = useState([]);
  const [dates, setdates] = useState([]);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchCalendarDays = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/calendar/getAll"); // Replace with your actual API endpoint

      if (response.ok) {
        const data = await response.json();

        // Separate questions and answers based on the "answer" field
        const calendarData = data;

        setCalendarData(calendarData);
        setdates(data.map((item) => item._date));
      } else {
        console.error("Failed to fetch dates.");
      }
    } catch (error) {
      console.error("Error fetching dates.", error);
    }
  };

  useEffect(() => {
    fetchCalendarDays();
  }, []);

  const ServerDay = (props) => {
    const { dates = [], day, outsideCurrentMonth, openMessageDialog } = props;

    const isSelected = dates.includes(props.day.format("YYYY-MM-DD"));

    const handleClick = () => {
      if (isSelected) {
        const messagesForDate = calendar
          .filter((item) => item._date === props.day.format("YYYY-MM-DD"))
          .map((item) => item._message);
        setMessages(messagesForDate);
        openMessageDialog(true);
      }
    };

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <PriorityHighIcon style={{ color: "CornflowerBlue" }} />
          ) : undefined
        }
        onClick={handleClick}
      >
        <PickersDay
          {...props}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  const handleCloseMessageDialog = () => {
    setMessages([]);
    setMessageDialogOpen(false);
  };

  return (
    <Paper
      style={{
        borderRadius: 10,
        backgroundColor: "white",
        boxShadow: 3,
        margin: 0,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (props) => (
              <ServerDay
                {...props}
                dates={dates}
                openMessageDialog={setMessageDialogOpen}
                setMessage={setMessages}
              />
            ),
          }}
          slotProps={{
            day: {
              dates,
            },
          }}
        />

        <Dialog
          open={messageDialogOpen}
          onClose={handleCloseMessageDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Date Messages</DialogTitle>
          <DialogContent>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseMessageDialog}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Paper>
  );
}
