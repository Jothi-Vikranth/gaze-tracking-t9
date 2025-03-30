import { Box } from "@mui/material";
import React, { useState } from "react";
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

  const [localSettings, setLocalSettings] = useState({
    ...settingsData,
  });
  const {
    hue,
    color,
    cursorSpeed,
    selectionSpeed,
    textSize,
    cursorSize,
    voice,
  } = localSettings;

  const handleColorChange = (color) => {
    setLocalSettings((prev) => ({
      ...prev,
      hue: color.oldHue,
      color: color.hex,
    }));
  };

  const onSaveClick = () => {
    dispatch(settingsDataActions.updateColor({ hue, color }));
    dispatch(settingsDataActions.updateCursorSpeed(cursorSpeed));
    dispatch(settingsDataActions.updateSelectionSpeed(selectionSpeed));
    dispatch(settingsDataActions.updateTextSize(textSize));
    dispatch(settingsDataActions.updateCursorSize(cursorSize));
    dispatch(settingsDataActions.updateVoice(voice));

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
                setLocalSettings((prev) => ({
                  ...prev,
                  cursorSpeed: SPEED[el],
                }));
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
                setLocalSettings((prev) => ({
                  ...prev,
                  selectionSpeed: SPEED[el],
                }));
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
                setLocalSettings((prev) => ({
                  ...prev,
                  textSize: SIZE[el],
                }));
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
                setLocalSettings((prev) => ({
                  ...prev,
                  cursorSize: SIZE[el],
                }));
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
                setLocalSettings((prev) => ({
                  ...prev,
                  voice: VOICE[el],
                }));
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
