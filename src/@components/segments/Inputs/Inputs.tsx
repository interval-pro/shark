import { useContext, useEffect, useState } from 'react';
import { ToggableWrapper } from '../../shared/Toggable/Toggable';
import { EInputsStateActionType, InputStateAction, InputsContext } from '../../../@core/state/inputs.state';
import { convertHexToBinary, convertTextToBinary } from './inputs.utils';
import './Inputs.scss';

enum EInputType {
    TEXT = 'TEXT',
    HEX = 'HEX',
    BINARY = 'BINARY',
};

interface IInputsContainerProps { }

export const InputsContainer: React.FC<IInputsContainerProps> = () => {

    const inputsContext = useContext(InputsContext);

    const [inputType, setInputType] = useState(EInputType.BINARY);
    const [inputText, setInputText] = useState('');
    const [inputHex, setInputHex] = useState('');
    const [inputBinary, setInputBinary] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        const data = { type: EInputsStateActionType.SET_TEXT, payload: inputText } as InputStateAction;
        if (inputText !== inputsContext.state.text) inputsContext.dispatch(data);
        const binary = convertTextToBinary(inputText);
        setInputBinary(binary);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputText, inputsContext.state.text]);

    useEffect(() => {
        const binary = convertHexToBinary(inputHex);
        setInputBinary(binary);
        const data = { type: EInputsStateActionType.SET_HEX, payload: inputHex } as InputStateAction;
        if (inputHex !== inputsContext.state.hex) inputsContext.dispatch(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputHex, inputsContext.state.hex]);

    useEffect(() => {
        const isValid = inputBinary.split('').every((char) => char === '0' || char === '1');
        setIsValid(isValid);
        const data = { type: EInputsStateActionType.SET_BINARY, payload: inputBinary } as InputStateAction;
        if (inputBinary !== inputsContext.state.binary) inputsContext.dispatch(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputBinary, inputsContext.state.binary]);

    useEffect(() => {
        const data = { type: EInputsStateActionType.SET_VALID, payload: isValid } as InputStateAction;
        inputsContext.dispatch(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid]);

    const _setInputType = (type: EInputType) => {
        setInputText('');
        setInputHex('');
        setInputBinary('');
        setInputType(type);
    };

    return (
        <div className="sticky">
            <ToggableWrapper title="Inputs" isValid={isValid}>
                <div className="InputsContainer">
                    <select className="custom-select" value={inputType} onChange={(event) => _setInputType(event.target.value as EInputType)}>
                        <option value={EInputType.TEXT}>Text</option>
                        <option value={EInputType.HEX}>Hex</option>
                        <option value={EInputType.BINARY}>Binary</option>
                    </select>
                    {
                        inputType === EInputType.TEXT &&
                        <textarea
                            className="custom-textarea"
                            placeholder="Enter your Text here..."
                            value={inputText}
                            onChange={(event) => setInputText(event.target.value)}
                            disabled={inputType !== EInputType.TEXT}
                        ></textarea>
                    }
                    {
                        inputType === EInputType.HEX &&
                        <textarea
                            className="custom-textarea"
                            placeholder="Enter your Hex here..."
                            value={inputHex}
                            onChange={(event) => setInputHex(event.target.value)}
                            disabled={inputType !== EInputType.HEX}
                        ></textarea>
                    }
                    <textarea
                        className="custom-textarea"
                        placeholder="Enter your Binary here..."
                        value={inputBinary}
                        onChange={(event) => setInputBinary(event.target.value)}
                        disabled={inputType !== EInputType.BINARY}
                    ></textarea>
                </div>
            </ToggableWrapper>
        </div>
    )
};
