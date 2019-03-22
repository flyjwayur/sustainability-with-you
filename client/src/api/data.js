// Sustainability words
export const words = [
  'RenewableEnergy',
  'Recycling',
  'Biodiversity',
  'test1',
  'test2',
  'test3',
  'test4',
];

export const wordsWithCheckBox = words.reduce((allWords, currentWord) => {
  return { ...allWords, [currentWord]: false };
}, {});
