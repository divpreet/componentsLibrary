import { ComponentType } from 'react';
import styled from 'styled-components';
import { domElements } from './domElements';
import { dclLightTheme } from '../../styles/dclProTheme';

const applyDefaultTheme = ({ theme = {}, ...props }) => {
    // Since styled-components defaults the `theme` prop to an empty object
    // inside of the styled component if a ThemeProvider is not present,
    // we check against the number of keys.
    return {
        ...props,
        theme: Object.keys(theme).length === 0 ? dclLightTheme : theme
    };
};

const applyDefaultThemeOnElement = key => {
    const value = styled(key);
    return value['attrs'](applyDefaultTheme);
};

type BaseStyled = typeof styled;

const styledFn: BaseStyled = (tag: string | ComponentType) => applyDefaultThemeOnElement(tag);
domElements.forEach(domElement => (styledFn[domElement] = applyDefaultThemeOnElement(domElement)));

// Extend styled components to use DCL theme as default
export const dclStyled = styledFn as BaseStyled &
    { [key in typeof domElements[number]]: ReturnType<BaseStyled> };
