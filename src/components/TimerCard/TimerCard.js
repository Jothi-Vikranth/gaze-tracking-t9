import { Box } from "@mui/material";
import React, { useRef, useState } from "react";

const TimerCard = ({ onTimerClick, children, active = true }) => {
  const delay = 1500;
  const length = 180;
  const thickness = 20;

  const circleWidth = Math.floor(length / 2);
  const circleRadius = Math.floor(circleWidth - thickness / 2);

  const dashArrayCount = Math.floor(3.14 * 2 * circleRadius);

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
      elapsed += 50; // Update every 50ms
      setProgress((elapsed / delay) * 100);
    }, 50);
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
      sx={{ position: "relative", width: "fit-content" }}
    >
      <Box
        sx={{
          position: "relative",
          //   aspectRatio: 1,
          width: length,
          height: length,
          //   width: `${length}px`,
          //   height: `${length}px`,
          borderRadius: "50%",
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
            width: `${length - 2 * thickness}px`,
            height: `${length - 2 * thickness}px`,
            borderRadius: "50%",

            // border: 1,
            backgroundColor: active ? "#0f0" : "#801515",
            // color: "#fff",
          }}
        >
          {children}
        </Box>
      </Box>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={length}
        height={length}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#e91e63" />
            <stop offset="100%" stop-color="#673ab7" />
          </linearGradient>
        </defs>
        <circle
          cx={`${circleWidth}`}
          cy={`${circleWidth}`}
          r={`${circleRadius}`}
          stroke-linecap="round"
          fill="none"
          strokeWidth={`${thickness}`}
          strokeDasharray={dashArrayCount}
          strokeDashoffset={Math.floor(
            dashArrayCount * (1 - parseFloat(progress / 100))
          )}
          stroke="#f75023"
          transform={`rotate(-82 90 90)`}
        />
      </svg>
    </Box>
  );
};

export default TimerCard;
