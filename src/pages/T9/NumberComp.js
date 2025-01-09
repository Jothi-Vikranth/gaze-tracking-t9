import { Box } from "@mui/material";
import React from "react";

const NumberComp = ({ number, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        fontSize: 25,
        fontWeight: 700,
      }}
    >
      <Box>{number}</Box>
      <Box>{text}</Box>
    </Box>
  );
};

export default NumberComp;
