// Sustainability words
export const words = [
  'RenewableEnergy',
  'Recycling',
  'Biodiversity',
  'test',
  'test',
  'test',
  'test',
];

export const wordsWithCheckBox = words.reduce((allWords, currentWord) => {
  return { ...allWords, [currentWord]: false };
}, {});
