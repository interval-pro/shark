import { useEffect, useState } from 'react';
import { ToggableWrapper } from '../../shared/Toggable/Toggable';
import './Result.scss';

interface IResultContainerProps {
    lastBlockHashes: number[];
}

export const ResultContainer: React.FC<IResultContainerProps> = ({ lastBlockHashes }) => {
    const [result, setResult] = useState<string>('');
    const getLastResult = () => {
        const hexHashes = lastBlockHashes.map(val => val.toString(16));
        const paddedHexHashes = hexHashes.map(val => val.padStart(8, '0'));
        const hash = paddedHexHashes.join('');
        return hash;
    };

    useEffect(() => {
        const final = getLastResult();
        setResult(final);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastBlockHashes]);

    return (
        <ToggableWrapper title='result'>
            <div className="ResultContainer">
                <div className="legend">
                    Each Value from Last Block Output is converted to Hexadecimal and padded to 8 characters.
                </div>
                <div className="hex-result">
                    {result}
                </div>
            </div>
        </ToggableWrapper>
    )
};
