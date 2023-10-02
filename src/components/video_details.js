import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const VidDetails = () => {
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="vid_title"
        label="Video Title"
        name="vid_title"
        autoFocus
      />

      <TextField
        id="vid_desc"
        label="Video description"
        multiline
        fullWidth
        rows={4}
        variant="filled"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "black",
          color: "white",
          "&:hover": { bgcolor: "#00ADB5", color: "white" },
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default VidDetails;
