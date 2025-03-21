import { Box } from "@mui/material";
import React from "react";

const SettingsButtonContainer = ({ children, sxProps = {} }) => {
  return (
    <Box sx={{ display: "flex", gap: 4, justifyContent: "center", ...sxProps }}>
      {children}
    </Box>
  );
};

export default SettingsButtonContainer;
