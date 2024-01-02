import { getHashesObj } from '../../../../@utils/convert';
import { ToggableWrapper } from '../../../shared/Toggable/Toggable';
import './Output.scss';

interface IWordsBlockContainerProps {
    blockIndex: number;
    outputHashes: number[];
}

export const OutputBlockContainer: React.FC<IWordsBlockContainerProps> = ({ blockIndex, outputHashes }) => {
    return (
        <ToggableWrapper title='Output' isSubWrapper={true}>
            <div className="OutputBlockContainer">
                <div className="legend">
                    {" Value = (Initial Hash Value + Value from the last step) >>> 0"}
                </div>
                <div className="hashes">
                    {
                        Object.keys(getHashesObj(outputHashes))
                            .map((l, i2) => (
                                <div key={i2} className="letter">
                                    {l}: {outputHashes[i2]}
                                </div>
                            ))
                    }
                </div>
            </div>
        </ToggableWrapper>
    )
};