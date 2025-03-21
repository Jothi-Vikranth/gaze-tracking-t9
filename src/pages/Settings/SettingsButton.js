import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const SettingsButton = ({
  text,
  isSelected,
  sxProps = {},
  onClick = () => {},
}) => {
  const color = useSelector((state) => state.settingsData.color);

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        paddingInline: 2,
        height: 45,
        border: "1px solid #000",
        borderRadius: "5px",
        fontSize: "23px",
        cursor: "pointer",
        backgroundColor: isSelected ? color : "#fff",
        ...sxProps,
      }}
      onClick={onClick}
    >
      {text}
    </Box>
  );
};

export default SettingsButton;
