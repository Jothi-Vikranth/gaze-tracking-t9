import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const SettingsSubmitButton = ({ buttonText, onClick = () => {} }) => {
  const color = useSelector((state) => state.settingsData.color);

  return (
    <Box
      sx={{
        paddingBlock: 2,
        paddingInline: 4,
        fontSize: 35,
        fontWeight: 700,
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#000",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "350ms all ease-in-out",
        "&:hover": {
          borderColor: color, // Border color on hover
          color: color,
        },
      }}
      onClick={onClick}
      s
    >
      {buttonText}
    </Box>
  );
};

export default SettingsSubmitButton;
