export const toBinaryWithPadZero = (num: number, padding = 0) => num.toString(2).padStart(padding, '0');
export const toNumberWithPadZero = (num: number, padding = 2) => num.toString().padStart(padding, '0');
export const toStringWithSpacePadding = (str: string, padding = 2) => str.padEnd(padding, ' ');

export const getHashesObj = (hashes: number[]) => {
    const [A, B, C, D, E, F, G, H] = hashes;
    return { A, B, C, D, E, F, G, H };
};