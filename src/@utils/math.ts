const ROTR = (n: number, x: number) => (x >>> n) | (x << (32 - n));
const SHR = (n: number, x: number) => x >>> n;

const SIGMA_0 = (x: number) => ROTR(7, x) ^ ROTR(18, x) ^ SHR(3, x);
const SIGMA_1 = (x: number) => ROTR(17, x) ^ ROTR(19, x) ^ SHR(10, x);

const UPPER_SIGMA_0 = (x: number) => ROTR(2, x) ^ ROTR(13, x) ^ ROTR(22, x);
const UPPER_SIGMA_1 = (x: number) => ROTR(6, x) ^ ROTR(11, x) ^ ROTR(25, x);

const CH = (x: number, y: number, z: number) => (x & y) ^ (~x & z);
const MA = (x: number, y: number, z: number) => (x & y) ^ (x & z) ^ (y & z);

export {
    SIGMA_0,
    SIGMA_1,
    UPPER_SIGMA_0,
    UPPER_SIGMA_1,
    CH,
    MA,
}