import { dclStyled } from '../Theme';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import * as sizes from '../../styles/dclSizes.json';

export const ButtonStyled = dclStyled(Button)`
    &.dclIconButton__root {
        height: ${sizes.spacing.factor4.s8};
        line-height: ${sizes.spacing.factor4.s8};
        cursor: pointer;
        padding: 0 ${sizes.spacing.factor4.s3};
        background: ${({ theme }) => theme.background.default};
        color: ${({ theme }) => theme.text.secondary};
        min-width: 0;
        width: ${sizes.spacing.factor4.s6};
        padding: 0 ${sizes.spacing.factor4.s4};

        &:hover {
            background-color: ${({ theme }) => theme.background.default};
            color: ${({ theme }) => theme.primary.main};
        }

        &:active {
            background: ${({ theme }) => theme.background.default};
            color: ${({ theme }) => theme.primary.main};
        }

        & .MuiButton-startIcon {
            margin: 0;
        }

        & .dclIconButton__text {
            text-indent: -999em;
            visibility: hidden;
            width: 0;
        }

        &.Mui-disabled {
            color: ${({ theme }) => theme.text.disabled};
            background-color: transparent;
            border-color: transparent;
        }
    }
`;

export const IconButtonStyled = dclStyled(IconButton)`
    &.dclIconButton__root {
        color: ${({ theme }) => theme.text.primary};
        background-color: transparent;
        width: ${sizes.spacing.factor4.s10};
        height: ${sizes.spacing.factor4.s10};

        &.Mui-disabled {
            color: ${({ theme }) => theme.text.disabled};
            background-color: transparent;
            border-color: transparent;
        }

        & .MuiIconButton-label > span.icon {
            font-size: ${sizes.spacing.factor4.s4};
        }

        &:hover {
            color: ${({ theme }) => theme.primary.main};
        }

        &.selected {
            color: ${({ theme }) => theme.primary.main};
        }

        &:active {
            color: ${({ theme }) => theme.primary.main};
        }

        & .dclIconButton__text {
            text-indent: -999em;
            visibility: hidden;
            width: 0;
        }
    }
    &.dclIconButton__primary {
        background-color: transparent;
        color: ${({ theme }) => theme.primary.main};
        &.Mui-disabled {
            color: ${({ theme }) => theme.text.disabled};
            background-color: transparent;
            border-color: transparent;
        }
        &:hover {
            color: ${({ theme }) => theme.primary.main};
        }
    }
`;
