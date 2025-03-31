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

const T9_page_2 = ({
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
      key={"page2"}
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

      <TimerCard onTimerClick={onUpdateData.bind(null, "mom")}>
        <NumberComp number={1} text={"MOM"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, "dad")}>
        <NumberComp number={2} text={"DAD"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, "yes")}>
        <NumberComp number={3} text={"YES"} />
      </TimerCard>
      <TimerCard onTimerClick={onBackClick}>
        <ImageComponent src={BackSpaceImg} alt="backspace" />
      </TimerCard>

      <TimerCard onTimerClick={onUpdateData.bind(null, "no")}>
        <NumberComp number={4} text={"NO"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, "wait")}>
        <NumberComp number={5} text={"WAIT"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, "again")}>
        <NumberComp number={6} text={"AGAIN"} />
      </TimerCard>
      <TimerCard onTimerClick={onCycleClick} active={cycleActive}>
        <ImageComponent src={CycleImg} alt="cycle" />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, "thirsty")}>
        <NumberComp number={7} text={"THIRSTY"} />
      </TimerCard>
      <TimerCard onTimerClick={onUpdateData.bind(null, "hungry")}>
        <NumberComp number={8} text={"HUNGRY"} />
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
      <TimerCard key={"switch_page_2"} onTimerClick={onSwitchPage}>
        <ImageComponent src={StarImg} alt="star" />
      </TimerCard>
    </Box>
  );
};

export default T9_page_2;
