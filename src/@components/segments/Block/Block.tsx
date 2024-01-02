import { useContext, useEffect, useState } from 'react';
import { EProcessStateActionType, IProcessBlock, ProcessContext } from '../../../@core/state/process.state';
import { ToggableWrapper } from '../../shared/Toggable/Toggable';
import { HashesBlockContainer } from './Hashes/Hashes';
import { IStep, ProcessBlockContainer } from './Process/Process';
import { WordsBlockContainer } from './Words/Words';
import { OutputBlockContainer } from './Output/Output';
import { processSteps } from './block.utils';

import './Block.scss';

interface IBlockContainerProps {
    blockInfo: IProcessBlock;
    blockIndex: number,
    hashes: number[],
}

export const BlockContainer: React.FC<IBlockContainerProps> = ({ blockInfo, blockIndex, hashes }) => {
    const processContext = useContext(ProcessContext);

    const [steps, setSteps] = useState<IStep[]>([]);
    const [outputHashes, setOutpuHashes] = useState<number[]>([]);

    useEffect(() => {
        const _steps = processSteps(hashes, blockInfo.words);
        setSteps(_steps);

        const q = _steps[_steps.length - 1];
        const _lastNumbs = [q.A, q.B, q.C, q.D, q.E, q.F, q.G, q.H];

        const sumValues = _lastNumbs.map((val, idx) => val + hashes[idx]);
        const unsignedValues = sumValues.map(val => val >>> 0);

        setOutpuHashes(unsignedValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blockInfo.words, blockIndex, hashes]);

    useEffect(() => {
        processContext.dispatch({
            type: EProcessStateActionType.SET_HASHES,
            payload: {
                blockIndex,
                hashes: outputHashes,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outputHashes]);

    return (
        <ToggableWrapper title={`Block ${blockIndex + 1}`}>
            <div className="BlockContainer">
                <WordsBlockContainer words={blockInfo.rawWords} blockIndex={blockIndex} />
                <HashesBlockContainer hashes={hashes} />
                <ProcessBlockContainer steps={steps} />
                <OutputBlockContainer blockIndex={blockIndex} outputHashes={outputHashes} />
            </div>
        </ToggableWrapper>
    );
};
