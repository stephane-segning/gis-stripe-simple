'use server';

import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 4,
    min: 1
  }
});

export default async function() {
  return lorem.generateSentences(1);
}