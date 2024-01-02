import { SIGMA_0, SIGMA_1 } from "../../../../@utils/math";

export const getAllWords = (words: string[]) => {
  if (words.length !== 16) return [];;
  const allWords = [
    ...words.map((word) => parseInt(word, 2)),
  ];
  for (let i = 16; i < 64; i++) {
    const s0 = SIGMA_0(allWords[i - 15]);
    const s1 = SIGMA_1(allWords[i - 2]);
    const SUM = allWords[i - 16] + s0 + allWords[i - 7] + s1;
    const unsigned = SUM >>> 0;
    allWords.push(unsigned);
  }

  return allWords;
};