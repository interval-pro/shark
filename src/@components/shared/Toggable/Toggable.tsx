import { ReactNode, useState } from 'react';
import './Toggable.scss';

interface IWrapperProps {
    children: ReactNode;
    title: string;
    isValid?: boolean;
    isSubWrapper?: boolean;
}

export const ToggableWrapper: React.FC<IWrapperProps> = ({ children, title, isSubWrapper, isValid }) => {
    const [isOpened, setOpened] = useState(false);

    return (
        <div className={`ToggableWrapper ${isSubWrapper ? 'sub-wrapper' : ''} ${isValid === false && 'not-valid'}`}>
            <div className="wrapper-title" onClick={() => setOpened(!isOpened)}>
                {title}
            </div>
            <div className={`wrapper-content ${!isOpened ? "opened-wrapper-content" : 'closed-wrapper-content'} `}>
                {children}
            </div>
        </div>
    )
};
