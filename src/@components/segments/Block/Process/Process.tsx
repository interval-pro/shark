import { toStringWithSpacePadding } from '../../../../@utils/convert';
import { ToggableWrapper } from '../../../shared/Toggable/Toggable';
import './Process.scss';

export interface IStep {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    G: number;
    H: number;
    T1: number;
    T2: number;
    W: number;
    K: number;
}

interface IProcessBlockContainerProps {
    steps: IStep[]
}

export const ProcessBlockContainer: React.FC<IProcessBlockContainerProps> = ({ steps }) => {
    return (
        <ToggableWrapper title='Process' isSubWrapper={true}>
            <div className="ProcessBlockContainer">
                <div className="legend">
                    {"K[i] is a constant defined in the SHA-256 specification"}
                    <br />
                    <br />
                    {"CH(x, y, z) = (x & y) ^ (~x & z)"}
                    <br />
                    {"MAJ(x, y, z) = (x & y) ^ (x & z) ^ (y & z)"}
                    <br />
                    {"S0(x) = (x >>> 2) ^ (x >>> 13) ^ (x >>> 22)"}
                    <br />
                    {"S1(x) = (x >>> 6) ^ (x >>> 11) ^ (x >>> 25)"}
                    <br />

                    <br />
                    <br />
                    {"t1 = H + S1(E) + CH(E, F, G) + K[i] + word[i]"}
                    <br />
                    {"t2 = S0(A) + MAJ(A, B, C)"}
                    <br />
                    <br />
                    {"H = G | G = F | F = E | E = (D + t1) >>> 0 | D = C | C = B | B = A | A = (t1 + t2) >>> 0"}
                </div>
                <div className="steps">
                    {
                        steps.map((step, index) => (
                            <div key={index} className="step">
                                <div className="step-title">
                                    Step {index + 1}
                                </div>
                                <div className="step-content">
                                    {
                                        Object.keys(step).map((l, i2) => (
                                            <div key={i2} className="letter">
                                                {toStringWithSpacePadding(l, 2)}: {step[l as keyof IStep]}
                                                {l === 'T2' && <div className="sep"></div>}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </ToggableWrapper>
    )
};
