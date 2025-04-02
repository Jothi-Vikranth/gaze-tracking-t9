import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiHandler } from "../../api/ApiHandler";

const Caliberate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await ApiHandler({
        requestConfig: {
          method: "post",
          endPoint: "caliberate",
          data: {},
        },
      });

      // Go to home
      navigate("/");
    })();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
      }}
    >
      Caliberation Going on. Please wait.
    </Box>
  );
};

export default Caliberate;
