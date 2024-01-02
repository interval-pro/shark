import { useContext, useMemo } from 'react';

import { InputsContext, InputsContextProvider } from './@core/state/inputs.state';
import { ProcessContext, ProcessContextProvider } from './@core/state/process.state';

import { InputsContainer } from './@components/segments/Inputs/Inputs';
import { PaddedContainer } from './@components/segments/Padded/Padded';
import { BlockContainer } from './@components/segments/Block/Block';
import { ResultContainer } from './@components/segments/Result/Result';

import { INIT_HASHES } from './@utils/values';

import './App.scss';

interface IAppProps {
    children?: React.ReactNode;
}

export const AppProvider: React.FC<IAppProps> = ({ children }) => {
    return (
        <InputsContextProvider>
            <ProcessContextProvider>
                {children}
            </ProcessContextProvider>
        </InputsContextProvider>
    );
};

export const App = () => {
    const processContext = useContext(ProcessContext);
    const inputContext = useContext(InputsContext);

    const isInputValid = useMemo(() => {
        return inputContext.state.isValid;
    }, [inputContext.state.isValid]);

    const blocks = useMemo(() => {
        return processContext.state.blocks;
    }, [processContext.state.blocks]);

    const lastBlockHashes = useMemo(() => {
        const lastBlock = processContext.state.blocks[processContext.state.blocks.length - 1];
        return lastBlock ? lastBlock.finalHashes : [];
    }, [processContext.state.blocks]);

    const getPrevHashes = (index: number) => {
        if (index === 0) return INIT_HASHES;
        return processContext.state.blocks[index - 1].finalHashes;
    };

    return (
        <div className="App">
            <div className="title">
                SHA-256 Hashing Visualization
            </div>
            <InputsContainer />
            {
                isInputValid &&
                <>
                    <PaddedContainer />
                    {
                        blocks.map((block, index) => {
                            const hashes = getPrevHashes(index);
                            return (
                                <BlockContainer key={index} blockInfo={block} blockIndex={index} hashes={hashes} />
                            )
                        })
                    }
                    <ResultContainer lastBlockHashes={lastBlockHashes} />
                </>
            }
        </div>
    )
}
