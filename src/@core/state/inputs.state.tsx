import React, { createContext, useReducer, Dispatch } from 'react';

interface IInputsState {
    text: string;
    hex: string;
    binary: string;
    isValid: boolean;
}

export enum EInputsStateActionType {
    SET_TEXT = 'SET_TEXT',
    SET_HEX = 'SET_HEX',
    SET_BINARY = 'SET_BINARY',
    SET_VALID = 'SET_VALID',
}

const initialState: IInputsState = {
    text: '',
    hex: '',
    binary: '',
    isValid: true,
};

export const InputsContext = createContext<{
    state: IInputsState;
    dispatch: Dispatch<InputStateAction>;
}>({
    state: initialState,
    dispatch: () => null
});

interface IInputsProvider {
    children: React.ReactNode;
}

export const InputsContextProvider: React.FC<IInputsProvider> = ({ children }) => {
    const [state, dispatch] = useReducer(InputsReducer, initialState);

    return (
        <InputsContext.Provider value={{ state, dispatch }}>
            {children}
        </InputsContext.Provider>
    );
};

interface ISetBinaryStateAction {
    type: EInputsStateActionType.SET_BINARY;
    payload: string;
};

interface ISetTextStateAction {
    type: EInputsStateActionType.SET_TEXT;
    payload: string;
};

interface ISetHexStateAction {
    type: EInputsStateActionType.SET_HEX;
    payload: string;
};

interface ISetValidStateAction {
    type: EInputsStateActionType.SET_VALID;
    payload: boolean;
};

export type InputStateAction = ISetBinaryStateAction | ISetTextStateAction | ISetHexStateAction | ISetValidStateAction;

export const InputsReducer = (state: IInputsState, action: InputStateAction): IInputsState => {
    switch (action.type) {
        case EInputsStateActionType.SET_BINARY:
            return { ...state, binary: action.payload };
        case EInputsStateActionType.SET_TEXT:
            return { ...state, text: action.payload };
        case EInputsStateActionType.SET_HEX:
            return { ...state, hex: action.payload };
        case EInputsStateActionType.SET_VALID:
            return { ...state, isValid: action.payload };
        default:
            return state;
    }
};
