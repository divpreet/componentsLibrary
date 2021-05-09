import * as React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ErrorStyled from './Error.styled';
import RestrictedAccess from '../../assets/restrictedAccess.svg';

export interface ErrorProps {
    className?: string;
    variant?: 'standard' | 'small';
    heading?: string;
    message?: string;
    secondaryMessage?: string;
    resetBtn?: {
        text?: string;
        iconClass?: string;
        onClick: () => void;
    };
}

const Error: React.FC<ErrorProps> = ({
    className,
    heading = 'Error',
    message = 'An error occurred.',
    secondaryMessage,
    resetBtn,
    variant = 'standard'
}) => {
    const renderMessage = (msg: string) => ({ __html: msg });
    // eslint-disable-next-line camelcase
    const customClassName = clsx(className, { dclError__small: variant === 'small' });

    const ResetBtn = () => (
        <Button className="dclError__resetBtn" onClick={resetBtn.onClick}>
            {resetBtn.iconClass && (
                <span className={`icon ${resetBtn.iconClass} dclError__resetIcon`} />
            )}
            {resetBtn.text || 'Reset'}
        </Button>
    );

    const Logo = () => <img className="dclError__logo" src={RestrictedAccess} alt="Error logo" />;

    return (
        <ErrorStyled className={customClassName}>
            <div className="dclError__content">
                <div className="dclError__body">
                    {variant === 'small' && <Logo />}
                    <h1
                        className="dclError__title"
                        dangerouslySetInnerHTML={renderMessage(heading)}
                    />
                    <h2
                        className="dclError__message"
                        dangerouslySetInnerHTML={renderMessage(message)}
                    />
                    {variant === 'standard' && <Logo />}
                    {resetBtn && <ResetBtn />}
                    {secondaryMessage && (
                        <h3
                            className="dclError__secondary"
                            dangerouslySetInnerHTML={renderMessage(secondaryMessage)}
                        />
                    )}
                </div>
            </div>
        </ErrorStyled>
    );
};

export default Error;
