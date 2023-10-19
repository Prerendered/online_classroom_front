import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button"; // Import Button
import { useTheme } from "@mui/material/styles";

import ViewTopic from "./topic_popups";

const SubjectsTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from database
    async function fetchData() {
      try {
        const response = await fetch(
          "https://online-classroom-backend.onrender.com/api/v2/subjects/getAll"
        );
        const result = await response.json();

        const transformedRows = result.map((entry) => ({
          id: parseInt(entry._subjectID, 10),
          name: entry.subjectName,
        }));

        setRows(transformedRows); // Populate rows with fetched data
      } catch (error) {
        console.error("There was a problem fetching data", error);
      }
    }
    fetchData();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [subjectName, setSelectedSubject] = React.useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (subjectName) => {
    setSelectedSubject(subjectName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      spacing={3}
      style={{ padding: "10%", alignItems: "center" }}
    >
      {rows.map((row) => (
        <Grid item xs={12} sm={6} md={4} key={row.id}>
          <Card
            style={{
              width: "300px",
              height: "300px",
              borderRadius: 0,
              boxShadow: "none",
            }}
          >
            <CardActionArea
              onClick={() => handleClickOpen(row.name)}
              style={{ height: "100%" }}
            >
              {" "}
              {/* Add height: '100%' */}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  {row.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      <Dialog
        maxWidth="md"
        fullWidth={true}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ fontWeight: "bold", fontSize: "2rem" }}
        >
          {"Topics:"}
        </DialogTitle>
        <DialogContent>
          <ViewTopic subjectName={subjectName} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SubjectsTable;
