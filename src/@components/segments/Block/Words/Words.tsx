import { useContext, useEffect, useState } from 'react';
import { ToggableWrapper } from '../../../shared/Toggable/Toggable';
import './Words.scss';
import { getAllWords } from './words.utils';
import { EProcessStateActionType, ProcessContext } from '../../../../@core/state/process.state';

interface IWordsBlockContainerProps {
    words: string[];
    blockIndex: number;
}
export const WordsBlockContainer: React.FC<IWordsBlockContainerProps> = ({ words, blockIndex }) => {
    const processContext = useContext(ProcessContext);

    const [allWords, setAllWords] = useState<number[]>([]);
    useEffect(() => {
        const _allWords = getAllWords(words);
        setAllWords(_allWords);
    }, [words]);

    useEffect(() => {
        processContext.dispatch({
            type: EProcessStateActionType.SET_WORDS,
            payload: { blockIndex, allWords },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allWords]);

    return (
        <ToggableWrapper title='Words' isSubWrapper={true}>
            <div className="WordsBlockContainer">
                <div className="legend">
                    {"s0(x) = (x >>> 7) ^ (x >>> 18) ^ (x >>> 3)"}
                    <br />
                    {"s1(x) = (x >>> 17) ^ (x >>> 19) ^ (x >>> 10)"}
                    <br />
                    <br />
                    {"n < 16: word[n] = 32 bit Word as Number"}
                    <br />
                    {"n > 16: word[n] = (word[i-16] + s0(word[i-15]) + word[i-7] + s1(word[i-2])) >>> 0"}

                </div>
                <div className="words">
                    {
                        allWords.map((word, index) => (
                            <div key={index} className="word">
                                Word {index + 1} - {word}
                            </div>
                        ))
                    }
                </div>
            </div>
        </ToggableWrapper>

    )
};
