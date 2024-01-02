import { toBinaryWithPadZero } from "../../../@utils/convert";

export const convertTextToBinary = (text: string) => {
    return [...text].reduce((acc: string, char: string) => {
        const charCode = char.charCodeAt(0);
        const charCodeBinary_string_8 = toBinaryWithPadZero(charCode, 8);
        return acc + charCodeBinary_string_8;
    }, '');
};

export const convertHexToBinary = (hex: string) => {
    return [...hex].reduce((acc: string, char: string) => {
        const charCode = parseInt(char, 16);
        const charCodeBinary_string_4 = toBinaryWithPadZero(charCode, 4);
        return acc + charCodeBinary_string_4;
    }, '');
};