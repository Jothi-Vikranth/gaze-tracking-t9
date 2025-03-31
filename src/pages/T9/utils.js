export const getT9Number = (numData) => {
  return numData.map((el) => (el + 1).toString()).join("");
};

export const getPossibleWords = (t9Number, t9Instance) => {
  const t9_length = t9Number.length;
  return t9Instance.predict(t9Number).filter((el) => el.length === t9_length);
};

export const getUpdateWord = (possibleWords, rawNumber) => {
  // If no words match the number combination
  if (possibleWords.length === 0) {
    return rawNumber.map((el) => el.toString()).join("");
  }
  // Have the first possible word matching combination
  else {
    return possibleWords[0];
  }
};
