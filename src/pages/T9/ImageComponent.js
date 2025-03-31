import { Box } from "@mui/material";
import React from "react";

const ImageComponent = ({ src, alt = "" }) => {
  return (
    <Box component={"img"} src={src} alt={alt} sx={{ width: 24, height: 24 }} />
  );
};

export default ImageComponent;
