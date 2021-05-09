import React, { createContext, useContext, useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import ComponentWOFF from '../../assets/fonts/Component.woff';
import { dclDarkTheme, dclLightTheme, DclProPaletteType } from '../../styles/dclProTheme';
import ComponentProducts from '../../utils/products';
import { Overrides } from '@material-ui/core/styles/overrides';

type BrandType = typeof ComponentProducts[number];
export type DclThemeType = { palette?: Partial<DclProPaletteType>; overrides?: Overrides };
export interface ThemeContextProps {
    /**
     * Set the theme mode - light or dark.
     * Defaults to light.
     */
    mode?: 'light' | 'dark';
    /**
     * Overrides for theme properties.
     */
    theme?: DclThemeType;
    /**
     * Set the Component brand to use in the components.
     * Defaults to ecm.
     */
    brand?: BrandType;
    /**
     * Set a brand colour if your brand is not supported by DCLCL yet.
     */
    brandColour?: string;
    /**
     * Method to set/change dark or light mode.
     */
    setMode?: (mode: 'light' | 'dark') => void;
    /**
     * Method to set/change brand.
     */
    setBrand?: (brand: BrandType) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    mode: 'light',
    brand: 'default',
    theme: { palette: dclLightTheme }
});

const isObject = item => {
    return item && typeof item === 'object' && !Array.isArray(item);
};

const mergeDeep = (target, source) => {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};

export const ThemeProvider: React.FC<ThemeContextProps> = ({
    children,
    mode = 'light',
    brand = 'default',
    brandColour,
    theme: overriddenTheme = {}
}) => {
    const defaultOverride = {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [
                    {
                        fontFamily: 'Objective',
                        fontStyle: 'normal',
                        fontDisplay: 'block',
                        fontWeight: 'normal',
                        src: `url(${ComponentWOFF}) format('woff')`
                    }
                ]
            }
        }
    };
    const overrides = mergeDeep(defaultOverride, overriddenTheme.overrides);
    const lightTheme = {
        palette: mergeDeep(dclLightTheme, overriddenTheme.palette),
        overrides
    };
    const darkTheme = {
        palette: mergeDeep(dclDarkTheme, overriddenTheme.palette),
        overrides
    };
    const lightMuiTheme = createMuiTheme(lightTheme);
    const darkMuiTheme = createMuiTheme(darkTheme);

    const [paletteMode, setPaletteMode] = useState<'light' | 'dark'>(mode);
    const [theme, setTheme] = useState<DclThemeType>(mode === 'light' ? lightTheme : darkTheme);
    const [selectedPalette, setSelectedPalette] = useState(theme.palette);
    const [selectedBrand, setSelectedBrand] = useState<BrandType>(brand);
    const [muiTheme, setMuiTheme] = useState(lightMuiTheme);

    const setMode = newMode => {
        setPaletteMode(newMode);

        if (newMode === 'light') {
            setTheme(lightTheme);
            setSelectedPalette(lightTheme.palette);
            setMuiTheme(lightMuiTheme);
        } else {
            setTheme(darkTheme);
            setSelectedPalette(darkTheme.palette);
            setMuiTheme(darkMuiTheme);
        }
    };

    useEffect(() => {
        setMode(mode);
    }, [mode]);

    useEffect(() => {
        setSelectedBrand(brand);
    }, [brand]);

    return (
        <ThemeContext.Provider
            value={{
                brand: selectedBrand,
                setBrand: setSelectedBrand,
                mode: paletteMode,
                setMode,
                brandColour: brandColour || selectedPalette.brandColours[selectedBrand],
                theme
            }}
        >
            <StyledThemeProvider theme={selectedPalette}>
                <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext: () => ThemeContextProps = () => useContext(ThemeContext);

export const ThemeConsumer = ThemeContext.Consumer;
