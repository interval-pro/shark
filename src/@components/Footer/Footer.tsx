import './Footer.scss';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="item">
                <div className="key">
                    Email:
                </div>
                <div className="value">
                    <a href="mailto:dev.peshev@gmail.com">
                        dev.peshev@gmail.com
                    </a>
                </div>
            </div>
            <div className="item">
                <div className="key">
                    GitHub:
                </div>
                <div className="value">
                    <a href="https://github.com/interval-pro/shark" target='_blank'  rel="noreferrer">
                        interval-pro/shark
                    </a>
                </div>
            </div>
        </div>
    )
}