// Sustainability words
export const words = ['RenewableEnergy', 'Recycling', 'Biodiversity'];

export const wordsWithCheckBox = words.reduce((allWords, currentWord) => {
  return { ...allWords, [currentWord]: false };
}, {});
