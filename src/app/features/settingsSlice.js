import { createSlice } from "@reduxjs/toolkit";

const SPEED = {
  SLOW: 0,
  MED: 1,
  FAST: 2,
};

const SIZE = {
  SMALL: 0,
  MED: 1,
  BIG: 2,
};

const VOICE = {
  ON: 0,
  OFF: 1,
};

var initialState = {
  hue: 0,
  color: "#fe7676",
  cursorSpeed: SPEED.MED,
  selectionSpeed: SPEED.SLOW,
  textSize: SIZE.MED,
  cursorSize: SIZE.MED,
  voice: VOICE.OFF,
};

const settingsDataSlice = createSlice({
  name: "settingsData",
  initialState: initialState,
  reducers: {
    updateColor(state, action) {
      state.color = action.payload.color;
      state.hue = action.payload.hue;
    },

    updateCursorSpeed(state, action) {
      state.cursorSpeed = action.payload;
    },

    updateSelectionSpeed(state, action) {
      state.selectionSpeed = action.payload;
    },

    updateTextSize(state, action) {
      state.textSize = action.payload;
    },

    updateCursorSize(state, action) {
      state.cursorSize = action.payload;
    },

    updateVoice(state, action) {
      state.voice = action.payload;
    },
  },
});

export const settingsDataActions = settingsDataSlice.actions;

export { SIZE, SPEED, VOICE };

export default settingsDataSlice.reducer;
