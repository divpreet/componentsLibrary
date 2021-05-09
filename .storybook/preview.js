import React from 'react';
import { ThemeProvider } from '../src/';

import './index.css';
import { useDarkMode } from 'storybook-dark-mode';
import { addDecorator, addParameters } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { CssBaseline } from '@material-ui/core';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import sbThemeLight from './sbThemeLight';
import sbThemeDark from './sbThemeDark';

export const isDarkStoryMode = () => {
    const params = new URL(location.href).searchParams;
    const mode = params.get('mode');
    return useDarkMode() || mode === 'dark';
};
addParameters({
    darkMode: {
        dark: sbThemeDark,
        light: sbThemeLight
    },
    viewport: {
        viewports: MINIMAL_VIEWPORTS
    }
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(storyFn => (
    <ThemeProvider mode={isDarkStoryMode() ? 'dark' : 'light'}>
        <CssBaseline />
        {storyFn()}
    </ThemeProvider>
));
