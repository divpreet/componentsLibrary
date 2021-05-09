import * as React from 'react';
import { MouseEventHandler } from 'react';
import { ButtonStyled, IconButtonStyled } from './IconButton.styled';

export interface IconButtonProps {
    a11yId?: string;
    ariaLabel?: string;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    onClickHandler: MouseEventHandler;
    tabIndex?: number;
    text: string;
    accent?: boolean;
    rounded?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
    accent = false,
    a11yId,
    ariaLabel,
    className,
    disabled = false,
    icon,
    onClickHandler,
    tabIndex,
    text,
    rounded = false
}) => {
    if (rounded) {
        return (
            <IconButtonStyled
                aria-label={ariaLabel || text}
                className={className}
                classes={{
                    root: 'dclIconButton__root',
                    colorPrimary: 'dclIconButton__primary'
                }}
                color={accent ? 'primary' : 'inherit'}
                disabled={disabled}
                onClick={onClickHandler}
                id={a11yId}
                tabIndex={tabIndex}
                title={text}
            >
                {icon}
                <span className="dclIconButton__text">{text}</span>
            </IconButtonStyled>
        );
    }
    return (
        <ButtonStyled
            aria-label={ariaLabel || text}
            className={className}
            classes={{
                root: 'dclIconButton__root'
            }}
            color="inherit"
            disabled={disabled}
            disableElevation
            onClick={onClickHandler}
            id={a11yId}
            startIcon={icon}
            variant="text"
            tabIndex={tabIndex}
            title={text}
        >
            <span className="dclIconButton__text">{text}</span>
        </ButtonStyled>
    );
};

export default IconButton;
