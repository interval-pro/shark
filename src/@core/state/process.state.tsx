import React, { createContext, useReducer, Dispatch } from 'react';

export interface IProcessBlock {
    rawWords: string[];
    words: number[];
    finalHashes: number[];
}

interface IProcessState {
    blocks: IProcessBlock[];
};

export enum EProcessStateActionType {
    SET_RAW_BLOCKS = 'SET_RAW_BLOCKS',
    SET_WORDS = 'SET_WORDS',
    SET_HASHES = 'SET_HASHES',
}

const initialState: IProcessState = {
    blocks: [],
};

interface ISetRawBlocksStateAction {
    type: EProcessStateActionType.SET_RAW_BLOCKS;
    payload: string[][];
};

interface ISetWordsStateAction {
    type: EProcessStateActionType.SET_WORDS;
    payload: {
        blockIndex: number;
        allWords: number[];
    };
};

interface ISetHahesStateAction {
    type: EProcessStateActionType.SET_HASHES;
    payload: {
        blockIndex: number;
        hashes: number[];
    };
};

type ProcessStateAction = ISetRawBlocksStateAction | ISetWordsStateAction | ISetHahesStateAction;

export const ProcessReducer = (state: IProcessState, action: ProcessStateAction): IProcessState => {
    switch (action.type) {
        case EProcessStateActionType.SET_RAW_BLOCKS:
            return {
                ...state,
                blocks: action.payload.map((words) => ({
                    rawWords: words,
                    words: [],
                    finalHashes: [],
                })),
            };
        case EProcessStateActionType.SET_WORDS:
            const updatedBlocks = state.blocks.map((block, index) => {
                if (index === action.payload.blockIndex) {
                    return { ...block, words: action.payload.allWords };
                }
                return block;
            });
            return {
                ...state,
                blocks: updatedBlocks,
            };

        case EProcessStateActionType.SET_HASHES:
            const _updatedBlocks = state.blocks.map((block, index) => {
                if (index === action.payload.blockIndex) {
                    return { ...block, finalHashes: action.payload.hashes };
                }
                return block;
            });
            return {
                ...state,
                blocks: _updatedBlocks,
            };
        default:
            return state;
    }
};

export const ProcessContext = createContext<{
    state: IProcessState;
    dispatch: Dispatch<ProcessStateAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

interface IProcessProvider {
    children: React.ReactNode;
}

export const ProcessContextProvider: React.FC<IProcessProvider> = ({ children }) => {
    const [state, dispatch] = useReducer(ProcessReducer, initialState);

    return (
        <ProcessContext.Provider value={{ state, dispatch }}>
            {children}
        </ProcessContext.Provider>
    );
};
