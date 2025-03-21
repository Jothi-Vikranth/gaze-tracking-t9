import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Caliberation from "../../images/calibration.png";
import Settings from "../../images/settings.png";
import TextBoard from "../../images/textboard.png";
import HomeComponent from "./HomeComponent";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate("/settings");
  };
  const goToT9 = () => {
    navigate("/t9");
  };

  useEffect(() => {
    import("../T9");
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <HomeComponent
        image={Settings}
        homeComponentProps={{ onClick: goToSettings }}
      />
      <HomeComponent image={Caliberation} />
      <HomeComponent
        image={TextBoard}
        homeComponentProps={{ onClick: goToT9 }}
      />
    </Box>
  );
};

export default Home;
