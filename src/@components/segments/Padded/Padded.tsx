import { useContext, useEffect, useState } from 'react';
import { ToggableWrapper } from '../../shared/Toggable/Toggable';
import './Padded.scss';
import { InputsContext } from '../../../@core/state/inputs.state';
import { padMessage, splitToStringWords, splitWordsInto16WordsBlocks } from './padded.utils';
import { toNumberWithPadZero } from '../../../@utils/convert';
import { EProcessStateActionType, ProcessContext } from '../../../@core/state/process.state';

export const PaddedContainer = () => {
    const inputsContext = useContext(InputsContext);
    const processContext = useContext(ProcessContext);

    const [blocks, setBlocks] = useState<string[][]>([[]]);

    useEffect(() => {
        const binary = inputsContext.state.binary;
        const paddedMessage = padMessage(binary);
        const words = splitToStringWords(paddedMessage);
        const blocks = splitWordsInto16WordsBlocks(words);
        setBlocks(blocks);
    }, [inputsContext.state.binary]);

    useEffect(() => {
        processContext.dispatch({ type: EProcessStateActionType.SET_RAW_BLOCKS, payload: blocks });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks]);


    return (
        <ToggableWrapper title='Padded Message'>
            <div className="padded-message-wrapper">
                <div className="raw-binary">
                    {blocks}
                </div>
                <ToggableWrapper title='Blocks' isSubWrapper={true}>
                    <div className="padded-message">
                        {
                            blocks.map((block, index) => {
                                return (
                                    <div className="block">
                                        <div className="block-index">
                                            Block {index + 1}
                                        </div>
                                        <div key={index} className="block-content">
                                            {
                                                block.map((word, index) => {
                                                    return (
                                                        <div key={index} className="padded-word">
                                                            Word {toNumberWithPadZero(index + 1)} - {word}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ToggableWrapper>

                <div className="padded-message-info">
                    <span> # Blocks: {blocks.length} </span>
                    <span> # 32 bit Words: {blocks.length * 16} </span>
                    <span> Total Padded Message Length: {blocks.length * 32 * 16} </span>
                </div>
            </div>
        </ToggableWrapper>
    )
};
