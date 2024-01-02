import { getHashesObj } from '../../../@utils/convert';
import { K } from '../../../@utils/values';
import { CH, MA, UPPER_SIGMA_0, UPPER_SIGMA_1 } from '../../../@utils/math';

export const processSteps = (hashes: number[], words: number[]) => {
    const initialStep = {
        ...getHashesObj(hashes),
        K: 0,
        T1: 0,
        T2: 0,
        W: 0,
    };

    const steps = [initialStep];

    for (let i = 1; i <= 64; i++) {
        const prev = steps[i - 1];
        const word = words[i - 1];

        const t1 = prev.H + UPPER_SIGMA_1(prev.E) + CH(prev.E, prev.F, prev.G) + K[i - 1] + word;
        const t2 = UPPER_SIGMA_0(prev.A) + MA(prev.A, prev.B, prev.C);

        const curr = {
            W: word,
            K: K[i - 1],

            T1: t1,
            T2: t2,

            H: prev.G,
            G: prev.F,
            F: prev.E,
            E: (prev.D + t1) >>> 0,
            D: prev.C,
            C: prev.B,
            B: prev.A,
            A: (t1 + t2) >>> 0,
        };

        steps.push(curr);
    }

    steps.shift();
    return steps;
};