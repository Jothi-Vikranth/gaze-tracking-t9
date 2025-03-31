import { Box } from "@mui/material";
import React from "react";
import TimerCard from "../../components/TimerCard";
import BackSpaceImg from "./../../images/backspace.png";
import CycleImg from "./../../images/cycle.png";
import PowerImg from "./../../images/power.png";
import SpaceImg from "./../../images/space.svg";
import StarImg from "./../../images/star.png";
import SubmitImg from "./../../images/submit.png";
import ImageComponent from "./ImageComponent";
import NumberComp from "./NumberComp";
import ShowText from "./ShowText";

const T9_page_1 = ({
  sentence,
  cycleActive,
  onUpdateData,
  onBackClick,
  onCycleClick,
  onSpaceSubmitClick,
  onSwitchPage,
}) => {
  return (
    <Box
      key={"page1"}
      sx={{
        display: "grid",
        width: "fit-content",
        gridTemplateColumns: "repeat(4,160px)",
        gridTemplateRows: "repeat(4,100px)",
        gap: 4,
        columnGap: 8,
        marginTop: 2,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box sx={{ gridColumn: "span 3", justifySelf: "stretch" }}>
        <ShowText text={sentence} />
      </Box>
      <TimerCard>
        <ImageComponent src={PowerImg} alt="power" />
      </TimerCard>

      <TimerCard onTimerClick={onUpdateData.bind(null, 1)}>
        <NumberComp number={1} text={"abc"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, 2)}>
        <NumberComp number={2} text={"def"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, 3)}>
        <NumberComp number={3} text={"ghi"} />
      </TimerCard>
      <TimerCard onTimerClick={onBackClick}>
        <ImageComponent src={BackSpaceImg} alt="backspace" />
      </TimerCard>

      <TimerCard onTimerClick={onUpdateData.bind(null, 4)}>
        <NumberComp number={4} text={"jkl"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, 5)}>
        <NumberComp number={5} text={"mno"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, 6)}>
        <NumberComp number={6} text={"pqrs"} />
      </TimerCard>
      <TimerCard onTimerClick={onCycleClick} active={cycleActive}>
        <ImageComponent src={CycleImg} alt="cycle" />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, 7)}>
        <NumberComp number={7} text={"tuv"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, 8)}>
        <NumberComp number={8} text={"wxyz"} />
      </TimerCard>
      <TimerCard
        onTimerClick={onSpaceSubmitClick}
        active={sentence.length !== 0}
      >
        {sentence.endsWith(" ") ? (
          <ImageComponent src={SubmitImg} alt="submit" />
        ) : (
          <ImageComponent src={SpaceImg} alt="space" />
        )}
      </TimerCard>
      <TimerCard key={"switch_page_1"} onTimerClick={onSwitchPage}>
        <ImageComponent src={StarImg} alt="star" />
      </TimerCard>
    </Box>
  );
};

export default T9_page_1;
