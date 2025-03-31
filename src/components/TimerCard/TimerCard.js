import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SPEED } from "../../app/features/settingsSlice";

const SELECTION_SPEED_DELAP_MAP = {
  [SPEED.SLOW]: 3000,
  [SPEED.MED]: 2250,
  [SPEED.FAST]: 1500,
};

const TimerCard = ({ onTimerClick, children, active = true }) => {
  const selectionSpeed = useSelector(
    (state) => state.settingsData.selectionSpeed
  );

  const delay = SELECTION_SPEED_DELAP_MAP[selectionSpeed];

  const width = 160;
  const height = 120;
  const thickness = 20;

  const dashArrayCount = (width + height - 4) * 2; // Perimeter of rectangle

  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const handleMouseEnter = () => {
    if (!active) return;
    startTimer();
  };

  const handleMouseLeave = () => {
    // Clear the timers and reset the progress bar
    clearTimeout(timerRef.current);
    clearInterval(progressIntervalRef.current);
    resetProgress();
  };

  const startTimer = () => {
    let elapsed = 0;

    // Start the timer for invoking the function
    timerRef.current = setTimeout(() => {
      onTimerClick(); // Invoke the function after delay
      resetProgress(); // Reset progress for the next cycle
      startTimer(); // Restart the timer if still hovering
    }, delay);

    // Start updating the progress bar
    progressIntervalRef.current = setInterval(() => {
      elapsed += 5; // Update every 50ms
      setProgress((elapsed / delay) * 100);
    }, 5);
  };

  const resetProgress = () => {
    setProgress(0);
    clearInterval(progressIntervalRef.current);
  };
  //   console.log(progress);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        width: "fit-content",
        fontSize: 25,
        fontWeight: 700,
      }}
    >
      <Box
        sx={{
          position: "relative",
          //   aspectRatio: 1,
          width: width,
          height: height,
          //   width: `${length}px`,
          //   height: `${length}px`,
          borderRadius: 5,
          p: `${thickness}px`,
          //   boxShadow:
          //     "6px 6px 10px -1px rgba(0 0 0 /.15),-6px -6px 10px -1px rgba(255 255 255 / .7)",
          //   border: 1,
          backgroundColor: "#eee",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: `${width - 2 * thickness}px`,
            height: `${height - 2 * thickness}px`,
            borderRadius: 5,
            letterSpacing: "1.5px",
            // border: 1,
            backgroundColor: active ? "#ffffe4" : "#801515",
            // color: "#fff",
          }}
        >
          {children}
        </Box>
      </Box>
      {/* <svg
        width="200"
        height="120"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          d="M 20 20 H 160 V 80 H 20 Z"
          stroke="#4F6DB6"
          stroke-width={`${thickness}`}
          fill="none"
          stroke-dasharray="400"
          stroke-dashoffset="200"
        ></path>
      </svg> */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <rect
          x={parseInt(thickness / 2)}
          y={parseInt(thickness / 2)}
          width={width - thickness}
          height={height - thickness}
          // rx={thickness}
          // ry={thickness}
          stroke="#4F6DB6"
          stroke-width={`${thickness}`}
          fill="none"
          stroke-dasharray={dashArrayCount}
          // stroke-dashoffset="0"
          strokeDashoffset={Math.floor(
            dashArrayCount * (1 - parseFloat(progress / 100))
          )}
        ></rect>
      </svg>
    </Box>
  );
};

export default TimerCard;
