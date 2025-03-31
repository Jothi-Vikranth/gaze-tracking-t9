import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SPEED } from "../../app/features/settingsSlice";
import useContainerSize from "./../../hooks/useContainerSize";

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
  const [ref, { width, height }] = useContainerSize();

  const thickness = 10;

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
        fontSize: 25,
        fontWeight: 700,
      }}
      ref={ref}
    >
      <Box
        sx={{
          position: "relative",
          width: width,
          height: height,
          borderRadius: "20px",
          p: `${thickness}px`,
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
            borderRadius: "10px",
            letterSpacing: "1.5px",
            // border: 1,
            backgroundColor: active ? "#ffffe4" : "#801515",
            // color: "#fff",
          }}
        >
          {children}
        </Box>
      </Box>
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
          rx={thickness}
          ry={thickness}
          stroke="#4F6DB6"
          stroke-width={`${thickness}`}
          fill="none"
          stroke-dasharray={dashArrayCount}
          strokeDashoffset={Math.floor(
            dashArrayCount * (1 - parseFloat(progress / 100))
          )}
        ></rect>
      </svg>
    </Box>
  );
};

export default TimerCard;
