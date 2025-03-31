import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { T9Search } from "t9-plus";
import { unigram } from "unigram";
import TimerCard from "../../components/TimerCard";
import BackSpaceImg from "./../../images/backspace.png";
import CycleImg from "./../../images/cycle.png";
import PowerImg from "./../../images/power.png";
import StarImg from "./../../images/star.png";
import ImageComponent from "./ImageComponent";
import NumberComp from "./NumberComp";
import ShowText from "./ShowText";

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

  const onAddNumber = (number) => {
    setRawNumberInp((prev) => [...prev, number]);
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

  const onSpaceClick = () => {
    setSentence((prev) => prev + " ");
    setRawNumberInp([]);
  };
  const onBackClick = () => {
    // Backspacing char in word
    if (rawNumberInp.length > 0) {
      setRawNumberInp((prev) => {
        if (prev.length == 1) return [];

        return prev.slice(0, prev.length - 1);
      });
    }
    // Backspacing space
    else {
      let word_ls = sentence.split(" ");
      if (word_ls[word_ls.length - 1] === "") {
        word_ls.pop();
        const last_word = word_ls[word_ls.length - 1];

        setRawNumberInp(last_word.split("").map((el) => mapper[el]));
        setSentence(word_ls.join(" "));
      }
    }
  };

  useEffect(() => {
    const t9Number = rawNumberInp.map((el) => (el + 1).toString()).join("");
    console.log(t9Number);
    const t9_length = t9Number.length;

    // Two possibilities  -> either a number has been selected or backspace has been clicked
    if (t9_length !== 0) {
      const possibleWords = t9
        .predict(t9Number)
        .filter((el) => el.length === t9_length);

      setSentence((prev) => {
        let word_ls = prev.split(" ");

        if (possibleWords.length === 0) {
          word_ls[word_ls.length - 1] = rawNumberInp
            .map((el) => el.toString())
            .join("");
          return word_ls.join(" ");
        }

        // sentence last word length != t9_length
        if (t9_length !== word_ls[word_ls.length - 1].length) {
          word_ls[word_ls.length - 1] = possibleWords[0];
          return word_ls.join(" ");
        }
        // sentence last word length == t9_length
        else {
          return prev;
        }
      });
      setAvailableWords(possibleWords);
      console.log(possibleWords);
    }
    // Two possibilities  -> either a number has been deleted by backspace or space has been clicked
    else {
      setAvailableWords([]);
      setSentence((prev) => {
        let word_ls = prev.split(" ");
        // sentence last word length != t9_length
        if (word_ls[word_ls.length - 1] !== "") {
          word_ls[word_ls.length - 1] = "";
          return word_ls.join(" ");
        }
        // sentence last word length == t9_length
        else {
          return prev;
        }
      });
    }
  }, [rawNumberInp]);

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

          <TimerCard onTimerClick={onAddNumber.bind(null, 1)}>
            <NumberComp number={1} text={"abc"} />
          </TimerCard>
          <TimerCard onTimerClick={onAddNumber.bind(null, 2)}>
            <NumberComp number={2} text={"def"} />
          </TimerCard>
          <TimerCard onTimerClick={onAddNumber.bind(null, 3)}>
            <NumberComp number={3} text={"ghi"} />
          </TimerCard>
          <TimerCard onTimerClick={onBackClick}>
            <ImageComponent src={BackSpaceImg} alt="backspace" />
          </TimerCard>

          <TimerCard onTimerClick={onAddNumber.bind(null, 4)}>
            <NumberComp number={4} text={"jkl"} />
          </TimerCard>
          <TimerCard onTimerClick={onAddNumber.bind(null, 5)}>
            <NumberComp number={5} text={"mno"} />
          </TimerCard>
          <TimerCard onTimerClick={onAddNumber.bind(null, 6)}>
            <NumberComp number={6} text={"pqrs"} />
          </TimerCard>
          <TimerCard
            onTimerClick={onCycleClick}
            active={availableWords.length !== 0}
          >
            <ImageComponent src={CycleImg} alt="cycle" />
          </TimerCard>
          <TimerCard onTimerClick={onAddNumber.bind(null, 7)}>
            <NumberComp number={7} text={"tuv"} />
          </TimerCard>
          <TimerCard onTimerClick={onAddNumber.bind(null, 8)}>
            <NumberComp number={8} text={"wxyz"} />
          </TimerCard>
          <TimerCard onTimerClick={onSpaceClick} active={sentence.length !== 0}>
            SPACE
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
