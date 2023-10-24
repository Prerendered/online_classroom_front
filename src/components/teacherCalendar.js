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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

export default function TeacherCalendar() {
  const currentDate = new Date();
  const [calendar, setCalendarData] = useState([]);
  const [dates, setdates] = useState([]);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageIDs, setID] = useState([]);
  const [messageEntry, setMessageEntry] = useState({
    date: dayjs(currentDate),
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState(dayjs(currentDate));

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
        const messageIdForDate = calendar
          .filter((item) => item._date === props.day.format("YYYY-MM-DD"))
          .map((item) => item._id);
        setMessages(messagesForDate);
        setID(messageIdForDate);
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
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setMessageEntry({ ...messageEntry, date: newDate.format("YYYY-MM-DD") });
    setMessageDialogOpen(true);
  };

  const handleMessageEntry = async () => {
    console.log(JSON.stringify(messageEntry));
    try {
      // Send a POST request to the backend API
      const response = await fetch("http://localhost:8080/api/calendar/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageEntry),
      });

      if (response.ok) {
        // If the request was successful, update the 'questions' state with the new question
        const newMessage = await response.json();
        setMessages([...messages, newMessage]);
      } else {
        console.error("Failed to submit message.");
      }
    } catch (error) {
      console.error("Error submitting the message", error);
    }
    setMessageEntry({ ...messageEntry, message: "" });
    fetchCalendarDays();
    setMessageDialogOpen(false);
  };

  const handleMessageDelete = async (dateId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/calendar/delete/${dateId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCalendarData(calendar.filter((item) => item._id !== dateId));
        setMessages([]);
      } else {
        console.error("Failed to delete the question.");
      }
    } catch (error) {
      console.error("Error deleting the question:", error);
    }
    setMessageDialogOpen(false);
    fetchCalendarDays();
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
          value={selectedDate}
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
          onChange={handleDateChange}
        />

        <Dialog
          open={messageDialogOpen}
          onClose={handleCloseMessageDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Date Messages</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {messages.map((message, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {message}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          onClick={() => handleMessageDelete(messageIDs[index])}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TextField
              style={{ padding: "10px", width: "90%", paddingTop: "15px" }}
              variant="outlined"
              value={messageEntry.message}
              onChange={(e) =>
                setMessageEntry({ ...messageEntry, message: e.target.value })
              }
            />
            <Button
              onClick={handleMessageEntry}
              color="primary"
              style={{ paddingTop: "3%" }}
            >
              Submit
            </Button>
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
