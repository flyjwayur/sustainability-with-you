// Sustainability words
export const words = [
  'climate',
  'human',
  'equality',
  'change',
  'future',
  'global',
  'local',
  'cancer',
  'economy',
  'knowledge',
  'energy',
  'internet',
  'system',
  'food',
  'question',
];

export const wordsWithCheckBox = words.reduce((allWords, currentWord) => {
  return { ...allWords, [currentWord]: Number(false) };
}, {});
