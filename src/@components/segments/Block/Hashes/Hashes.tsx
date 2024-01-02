import { ToggableWrapper } from '../../../shared/Toggable/Toggable';
import './Hashes.scss';

interface IHashesBlockContainerProps {
    hashes: number[];
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const HashesBlockContainer: React.FC<IHashesBlockContainerProps> = ({ hashes }) => {
    return (
        <ToggableWrapper title='Hashes' isSubWrapper={true}>
            <div className="HashesBlockContainer">
                <div className="legend">
                    Hash Values for Bock 1 are constants defined in the SHA-256 specification
                    <br />
                    Hash Values for each next block are output of the previous block
                </div>
                <div className="hashes">
                    {
                        hashes.map((hash, index) => (
                            <div key={index} className="hash">
                                {letters[index]} - {hash}
                            </div>
                        ))
                    }
                </div>
            </div>
        </ToggableWrapper>

    )
};
