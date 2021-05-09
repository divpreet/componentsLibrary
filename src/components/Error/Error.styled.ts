import { dclStyled } from '../Theme';
import * as sizes from '../../styles/dclSizes.json';

const ErrorStyle = dclStyled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: ${sizes.spacing.factor4.s4};
    box-sizing: border-box;

    .dclError__content {
        display: flex;
        flex-direction: column;
        height: auto;
        text-align: center;
    }
    .dclError__body {
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: ${sizes.spacing.factor4.s4};
    }
    .dclError__title {
        flex: none;
        color: ${({ theme }) => theme.text.primary};
        font-size: ${sizes.typography.size.xxlarge};
        font-weight: ${sizes.typography.weight.bold};
        line-height: 1.2em;
        margin: ${sizes.spacing.factor4.s6} 0;
    }
    .dclError__message {
        font-size: ${sizes.typography.size.large};
        font-weight: 400;
        color: ${({ theme }) => theme.text.secondary};
        margin-top: 0;
        margin-bottom: ${sizes.spacing.factor4.s6};
    }
    .dclError__secondary {
        font-size: ${sizes.typography.size.medium};
        font-weight: 400;
        color: ${({ theme }) => theme.text.secondary};
    }
    .dclError__resetBtn {
        margin: 0 auto;
    }
    .dclError__resetIcon {
        font-size: ${sizes.typography.size.small};
    }
    .dclError__logo {
        height: ${sizes.spacing.factor4.s87};
        width: ${sizes.spacing.factor4.s100};
        margin: ${sizes.spacing.factor4.s4} auto;
    }
    &.dclError__small {
        .dclError__title {
            font-weight: 400;
        }
        .dclError__logo {
            height: ${sizes.spacing.factor4.s40};
            width: ${sizes.spacing.factor4.s40};
        }
    }
`;

export default ErrorStyle;
