import React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams to get name from url

const Subtitle = () => {
  const { name } = useParams(); // Get the name from URL

  return (
    <Typography
      variant="h3"
      component="h3"
      align="left"
      style={{
        marginLeft: "5%",
        marginTop: "2%",
        marginBottom: "-2%",
        fontFamily: "Roboto Condensed, sans-serif",
        fontWeight: "Bold",
      }}
    >
      {name} {/* name taken from url*/}
    </Typography>
  );
};

export default Subtitle;
