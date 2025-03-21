import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { HuePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import {
  settingsDataActions,
  SIZE,
  SPEED,
  VOICE,
} from "../../app/features/settingsSlice";
import Heading from "./Heading";
import SettingsButton from "./SettingsButton";
import SettingsButtonContainer from "./SettingsButtonContainer";
import SettingsSubmitButton from "./SettingsSubmitButton";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const settingsData = useSelector((state) => state.settingsData);
  const {
    hue,
    color,
    cursorSpeed,
    selectionSpeed,
    textSize,
    cursorSize,
    voice,
  } = settingsData;

  const handleColorChange = (color) => {
    dispatch(
      settingsDataActions.updateColor({ hue: color.oldHue, color: color.hex })
    );
  };

  const onSaveClick = () => {
    navigate("/");
  };

  const onBackClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ width: 1000 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gridTemplateRows: "repeat(6, minmax(50px, auto))",
          m: 3,
          rowGap: "15px",
          alignItems: "center",
        }}
      >
        <Heading text={"BUTTON COLOR"} />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <>
            <HuePicker color={color} onChange={handleColorChange} />
          </>
        </Box>
        <Heading text={"SPEED OF CURSOR"} />
        <SettingsButtonContainer>
          {Object.keys(SPEED).map((el) => (
            <SettingsButton
              text={el}
              isSelected={cursorSpeed === SPEED[el]}
              onClick={() => {
                dispatch(settingsDataActions.updateCursorSpeed(SPEED[el]));
              }}
            />
          ))}
        </SettingsButtonContainer>

        <Heading text={"SELECTION SPEED"} />
        <SettingsButtonContainer>
          {Object.keys(SPEED).map((el) => (
            <SettingsButton
              text={el}
              isSelected={selectionSpeed === SPEED[el]}
              onClick={() => {
                dispatch(settingsDataActions.updateSelectionSpeed(SPEED[el]));
              }}
            />
          ))}
        </SettingsButtonContainer>

        <Heading text={"TEXT SIZE"} />
        <SettingsButtonContainer>
          {Object.keys(SIZE).map((el, index) => (
            <SettingsButton
              text={el}
              isSelected={textSize === SIZE[el]}
              sxProps={{ fontSize: `${23 + (index - 1) * 3}px` }}
              onClick={() => {
                dispatch(settingsDataActions.updateTextSize(SIZE[el]));
              }}
            />
          ))}
        </SettingsButtonContainer>

        <Heading text={"CURSOR SIZE"} />
        <SettingsButtonContainer>
          {Object.keys(SIZE).map((el, index) => (
            <SettingsButton
              text={el}
              isSelected={cursorSize === SIZE[el]}
              sxProps={{ fontSize: `${23 + (index - 1) * 3}px` }}
              onClick={() => {
                dispatch(settingsDataActions.updateCursorSize(SIZE[el]));
              }}
            />
          ))}
        </SettingsButtonContainer>

        <Heading text={"VOICE"} />
        <SettingsButtonContainer sxProps={{ gap: 6 }}>
          {Object.keys(VOICE).map((el, index) => (
            <SettingsButton
              text={el}
              isSelected={voice === VOICE[el]}
              onClick={() => {
                dispatch(settingsDataActions.updateVoice(VOICE[el]));
              }}
            />
          ))}
        </SettingsButtonContainer>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "end", gap: 8, mt: 8, mr: 20 }}
      >
        <SettingsSubmitButton buttonText={"SAVE"} onClick={onSaveClick} />
        <SettingsSubmitButton buttonText={"BACK"} onClick={onBackClick} />
      </Box>
    </Box>
  );
};

export default Settings;
