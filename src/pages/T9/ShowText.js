import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const ShowText = ({ text }) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        p: 3,
        border: "1px solid #000",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          whiteSpace: "pre",
        }}
      >
        {text.toUpperCase()}
        {showCursor && (
          <Box
            sx={{
              content: '""',
              position: "absolute",
              top: "50%",
              right: -1,
              width: "1px",
              height: "200%",
              transform: "translateY(-50%)",
              backgroundColor: "#000",
            }}
          ></Box>
        )}
      </Box>
    </Box>
  );
};

export default ShowText;
