import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { T9Search } from "t9-plus";
import { unigram } from "unigram";
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
import { getPossibleWords, getT9Number, getUpdateWord } from "./utils";

const mapper = {
  a: 1,
  b: 1,
  c: 1,
  d: 2,
  e: 2,
  f: 2,
  g: 3,
  h: 3,
  i: 3,
  j: 4,
  k: 4,
  l: 4,
  m: 5,
  n: 5,
  o: 5,
  p: 6,
  q: 6,
  r: 6,
  s: 6,
  t: 7,
  u: 7,
  v: 7,
  w: 8,
  x: 8,
  y: 8,
  z: 8,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
};

const T9 = () => {
  const [rawNumberInp, setRawNumberInp] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [sentence, setSentence] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [t9, setT9] = useState(null);

  const setSentenceFromNumData = (numLsData) => {
    // Last char is a alnum char
    if (numLsData.length !== 0) {
      const t9Number = getT9Number(numLsData);
      const possibleWords = getPossibleWords(t9Number, t9);

      setSentence((prev) => {
        let word_ls = prev.split(" ");

        word_ls[word_ls.length - 1] = getUpdateWord(possibleWords, numLsData);
        return word_ls.join(" ");
      });
    }
    // Last char is a space
    else {
      setSentence((prev) => {
        // sentence last word length != t9_length
        if (!prev.endsWith(" ")) {
          return prev + " ";
        } else {
          return prev;
        }
      });
    }
  };

  const setAvailableWordsFromNumLsData = (numLsData) => {
    // Last char is a alnum char
    if (numLsData.length !== 0) {
      const t9Number = getT9Number(numLsData);
      const possibleWords = getPossibleWords(t9Number, t9);
      setAvailableWords(possibleWords);
    }
    // Last char is a space
    else {
      setAvailableWords([]);
    }
  };

  const onCycleClick = () => {
    setSentence((prev) => {
      let word_ls = prev.split(" ");
      const lastWord = word_ls[word_ls.length - 1];

      if (lastWord !== "") {
        const pos = availableWords.indexOf(lastWord);
        word_ls[word_ls.length - 1] =
          availableWords[(pos + 1) % availableWords.length];
        return word_ls.join(" ");
      } else {
        return prev;
      }
    });
  };

  const onSpaceSubmitClick = () => {
    if (sentence.endsWith(" ")) {
      return;
    }

    setSentence((prev) => prev + " ");
    setRawNumberInp([]);
    setAvailableWords([]);
  };

  const onBackClick = () => {
    // Backspacing char in word
    if (rawNumberInp.length > 0) {
      const numLsData =
        rawNumberInp.length === 1
          ? []
          : rawNumberInp.slice(0, rawNumberInp.length - 1);

      setRawNumberInp(numLsData);
      setSentence((prev) => prev.slice(0, -1));
      setAvailableWordsFromNumLsData([]);
    }
    // Backspacing space
    else {
      let word_ls = sentence.split(" ");
      if (word_ls[word_ls.length - 1] === "") {
        word_ls.pop();
        const last_word = word_ls[word_ls.length - 1];

        const numLsData = last_word.split("").map((el) => mapper[el]);
        setRawNumberInp(numLsData);
        setSentence(word_ls.join(" "));
        setAvailableWordsFromNumLsData(numLsData);
      }
    }
  };

  const onUpdateByNumData = (numData) => {
    console.log(numData);
    const numLsData = [...rawNumberInp, numData];
    setRawNumberInp((prev) => [...prev, numData]);
    setSentenceFromNumData(numLsData);
    setAvailableWordsFromNumLsData(numLsData);
  };

  useEffect(() => {
    const initializeT9 = () => {
      const t9Instance = new T9Search();

      // Limit unigram words to top 20,000 and create a weighted map
      const wordsWithWeight = unigram.slice(0, 30000);
      const map = new Map();

      for (let i = 0; i < wordsWithWeight.length; i++) {
        map.set(wordsWithWeight[i]["word"], wordsWithWeight[i]["freq"]);
      }

      // Set the dictionary with weights in T9Search
      t9Instance.setDictWithWeight(map);

      // Save the initialized T9 instance in state
      setT9(t9Instance);
    };
    initializeT9();
  }, []);

  return (
    <>
      {currPage == 1 && (
        <Box
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

          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 1)}>
            <NumberComp number={1} text={"abc"} />
          </TimerCard>
          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 2)}>
            <NumberComp number={2} text={"def"} />
          </TimerCard>
          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 3)}>
            <NumberComp number={3} text={"ghi"} />
          </TimerCard>
          <TimerCard onTimerClick={onBackClick}>
            <ImageComponent src={BackSpaceImg} alt="backspace" />
          </TimerCard>

          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 4)}>
            <NumberComp number={4} text={"jkl"} />
          </TimerCard>
          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 5)}>
            <NumberComp number={5} text={"mno"} />
          </TimerCard>
          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 6)}>
            <NumberComp number={6} text={"pqrs"} />
          </TimerCard>
          <TimerCard
            onTimerClick={onCycleClick}
            active={availableWords.length !== 0}
          >
            <ImageComponent src={CycleImg} alt="cycle" />
          </TimerCard>
          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 7)}>
            <NumberComp number={7} text={"tuv"} />
          </TimerCard>
          <TimerCard onTimerClick={onUpdateByNumData.bind(null, 8)}>
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
          <TimerCard onTimerClick={() => {}}>
            <ImageComponent src={StarImg} alt="star" />
          </TimerCard>
        </Box>
      )}
    </>
  );
};

export default T9;
