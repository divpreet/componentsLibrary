import { create } from '@storybook/theming/create';
import dclPro from './../src/styles/dclProPalette';

const palette = dclPro.light;

export default create({
    base: 'light',

    colorPrimary: palette.obj.blue,
    colorSecondary: palette.obj.blue,

    // UI
    appBg: palette.obj.day,
    appContentBg: palette.obj.taro,
    appBorderColor: palette.obj.deco,
    appBorderRadius: 4,

    // Typography
    fontBase: 'Roboto, sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: palette.obj.twilight,
    textInverseColor: palette.obj.night,

    // Toolbar default and active colors
    barTextColor: palette.obj.night,
    barSelectedColor: palette.obj.blue,
    barBg: palette.obj.white,

    // Form colors
    inputBg: palette.obj.white,
    inputBorder: palette.obj.deco,
    inputTextColor: palette.obj.night,
    inputBorderRadius: 4,

    brandTitle: 'Component Design Language - Component Library',
    brandUrl: 'https://dcl.component.com',
    brandImage: './assets/dcl-logo-light.svg'
});
