import { create } from '@storybook/theming/create';
import dclPro from './../src/styles/dclProPalette';

const palette = dclPro.dark;

export default create({
    base: 'dark',

    colorPrimary: palette.space.blue,
    colorSecondary: palette.space.blue,

    // UI
    appBg: palette.vacuum.dp2,
    appContentBg: palette.vacuum.dp,
    appBorderColor: palette.vacuum.dp,
    appBorderRadius: 4,

    // Typography
    fontBase: 'Roboto, sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: palette.space.moonlight,
    textInverseColor: palette.vacuum.dp,

    // Toolbar default and active colors
    barTextColor: palette.space.white,
    barSelectedColor: palette.space.blue,
    barBg: palette.vacuum.dp6,

    // Form colors
    inputBg: palette.vacuum.dp,
    inputBorder: palette.space.ornamentBG,
    inputTextColor: palette.space.moonlight,
    inputBorderRadius: 4,

    brandTitle: 'Component Design Language - Component Library',
    brandUrl: 'https://dcl.component.com',
    brandImage: './assets/dcl-logo-dark.svg'
});
