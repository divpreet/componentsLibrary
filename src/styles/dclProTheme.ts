import { CSSProperties } from 'react';
import dclPro from './dclProPalette';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const standardFontFamily = [
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Arial',
    'Helvetica',
    'sans-serif'
].join(',');

const standardTypography: CSSProperties = {
    fontFamily: standardFontFamily,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 1
};

export interface DclProPaletteType extends PaletteOptions {
    background: {
        default: string;
        paper: string;
        tertiary: string;
    };
    global: {
        navigationText: string;
        navigationBg: string;
        navigationSelectedBg: string;
        headerBg: string;
    };
    brandColours: {
        default: string;
        secondary: string;
    };
    meaningful: {
        red: string;
        yellow: string;
        green: string;
        blue: string;
        purple: string;
    };
    alerts: {
        error: string;
        success: string;
        info: string;
        warning: string;
        errorBg: string;
        warningBg: string;
        successBg: string;
        infoBg: string;
        button: string;
    };
    typography: {
        fontFamily: string;
        h1: CSSProperties;
        h2: CSSProperties;
        h3: CSSProperties;
        h4: CSSProperties;
        h5: CSSProperties;
        h6: CSSProperties;
        subtitle1: CSSProperties;
        subtitle2: CSSProperties;
        body1: CSSProperties;
        body2: CSSProperties;
        htmlFontSize: number;
    };
    highlight: {
        red: string;
        yellow: string;
        green: string;
        blue: string;
    };
}

const lightPalette = dclPro.light;
export const dclLightTheme: DclProPaletteType = {
    primary: {
        main: lightPalette.obj.blue
    },
    text: {
        primary: lightPalette.obj.night,
        secondary: lightPalette.obj.twilight,
        disabled: lightPalette.obj.neutral
    },
    divider: lightPalette.obj.deco,
    global: {
        headerBg: lightPalette.obj.night,
        navigationText: lightPalette.obj.white,
        navigationBg: lightPalette.obj.night,
        navigationSelectedBg: lightPalette.obj.twilight
    },
    background: {
        default: lightPalette.obj.white,
        paper: lightPalette.obj.day,
        tertiary: lightPalette.obj.taro
    },
    meaningful: {
        red: lightPalette.obj.red,
        yellow: lightPalette.obj.yellow,
        green: lightPalette.obj.green,
        blue: lightPalette.obj.blue,
        purple: lightPalette.obj.purple
    },
    alerts: {
        error: lightPalette.obj.red,
        success: lightPalette.obj.green,
        info: lightPalette.obj.blue,
        warning: lightPalette.obj.yellow,
        errorBg: lightPalette.obj.lightRed,
        warningBg: lightPalette.obj.lightYellow,
        successBg: lightPalette.obj.lightGreen,
        infoBg: lightPalette.obj.lightBlue,
        button: lightPalette.obj.night
    },
    brandColours: {
        default: lightPalette.brand.default,
        secondary: lightPalette.brand.secondary
    },
    typography: {
        // Font family - based on DCL
        fontFamily: standardFontFamily,
        // Normalize typography - separate styles from semantic
        h1: standardTypography,
        h2: standardTypography,
        h3: standardTypography,
        h4: standardTypography,
        h5: standardTypography,
        h6: standardTypography,
        subtitle1: standardTypography,
        subtitle2: standardTypography,
        body1: standardTypography,
        body2: standardTypography,
        htmlFontSize: 14
    },
    highlight: {
        red: lightPalette.obj.lightRed,
        yellow: lightPalette.obj.lightYellow,
        green: lightPalette.obj.lightGreen,
        blue: lightPalette.obj.lightBlue
    }
};

const darkPalette = dclPro.dark;
export const dclDarkTheme: DclProPaletteType = {
    ...dclLightTheme,
    primary: {
        main: darkPalette.space.blue
    },
    text: {
        primary: darkPalette.space.white,
        secondary: darkPalette.space.moonlight,
        disabled: darkPalette.space.ornamentBG
    },
    divider: darkPalette.space.ornamentBG,
    background: {
        default: darkPalette.vacuum.dp2,
        paper: darkPalette.vacuum.dp3,
        tertiary: darkPalette.vacuum.dp4
    },
    meaningful: {
        red: darkPalette.space.red,
        yellow: darkPalette.space.yellow,
        green: darkPalette.space.green,
        blue: darkPalette.space.blue,
        purple: darkPalette.space.purple
    },
    highlight: {
        ...dclLightTheme.highlight,
        blue: darkPalette.space.starlight
    },
    brandColours: {
        default: darkPalette.brandSpace.default,
        secondary: darkPalette.brandSpace.secondary
    }
};
