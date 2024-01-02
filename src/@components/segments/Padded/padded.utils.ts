import { toBinaryWithPadZero } from "../../../@utils/convert";

export const padMessage = (message: string) => {
    const messageWithOneBit = message + '1';
    const lengthBitString = toBinaryWithPadZero(message.length, 64);

    const zeroBitsToAdd = (512 - (messageWithOneBit.length + 64) % 512) % 512;
    const zerosToAdd = '0'.repeat(zeroBitsToAdd);

    const finalString = messageWithOneBit + zerosToAdd + lengthBitString;
    return finalString;
};

export const splitToStringWords = (blockString: string) => {
    const words = [];
    for (let i = 0; i < blockString.length; i += 32) {
        words.push(blockString.slice(i, i + 32));
    }
    return words;
};

export const splitWordsInto16WordsBlocks = (words: string[]) => {
    const blocks = [];
    for (let i = 0; i < words.length; i += 16) {
        blocks.push(words.slice(i, i + 16));
    }
    return blocks;
};