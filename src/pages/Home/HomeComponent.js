import { Box } from "@mui/material";

const HomeComponent = ({ image, homeComponentProps }) => {
  return (
    <Box sx={{ cursor: "pointer" }} {...homeComponentProps}>
      <img src={image} />
    </Box>
  );
};

export default HomeComponent;
