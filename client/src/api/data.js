// Sustainability words
export const words = [
  'word0',
  'word1',
  'word2',
  'word3',
  'word4',
  'word5',
  'word6',
  'word7',
  'word8',
  'word9',
];

export const wordsWithCheckBox = words.reduce((allWords, currentWord) => {
  return { ...allWords, [currentWord]: false };
}, {});
