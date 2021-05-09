import CircularProgress from '@material-ui/core/CircularProgress';
import { dclStyled } from '../Theme';

export const LoaderStyled = dclStyled(CircularProgress)`
    &.dclLoader {
        color: ${({ brandcolour }) => brandcolour};
    }
    .dclLoader__svg {
        width: ${({ size }) => size};
        height: ${({ size }) => size};
    }
`;
