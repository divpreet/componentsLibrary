import * as React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Box, Container, Paper } from '@material-ui/core';
import { isDarkStoryMode } from '../../../.storybook/preview';
import { select } from '@storybook/addon-knobs';
import { ThemeProvider } from './ThemeContext';
import ComponentProducts from '../../utils/products';
import IconButton from '../IconButton';
import { Loader } from '../index';

export default {
    title: 'Foundation / Theme',
    component: ThemeProvider,
    componentSubtitle: 'Sets theme for all child components'
};

const getThemeMode = () => {
    return isDarkStoryMode() ? 'dark' : 'light';
};
const DummyComponent: React.FC = () => {
    return (
        <Container>
            <Box display="flex" justifyContent="center" p={2}>
                <Loader a11yId="loader-one" />
            </Box>
            <Paper elevation={0}>
                <Box display="flex" justifyContent="center" p={2}>
                    <Loader a11yId="loader-two" />
                </Box>
            </Paper>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around" p={2}>
                <IconButton
                    icon={<span className="icon icon-earth" />}
                    rounded
                    onClickHandler={action('onClickHandler')}
                    text={'Primary Button'}
                />
            </Box>
            <Paper elevation={0}>
                <Box display="flex" flexWrap="wrap" justifyContent="space-around" p={2}>
                    <IconButton
                        icon={<span className="icon icon-global" />}
                        rounded
                        onClickHandler={action('onClickHandler')}
                        text={'Primary Button'}
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export const DCLTheme: Story = () => (
    <ThemeProvider
        mode={getThemeMode()}
        brand={select('Product', ComponentProducts, ComponentProducts[1], 'Product')}
    >
        <DummyComponent />
    </ThemeProvider>
);

export const DCLThemeDefault: Story = () => (
    <ThemeProvider mode={getThemeMode()} brand="default">
        <DummyComponent />
    </ThemeProvider>
);
export const DCLThemeSecondary: Story = () => (
    <ThemeProvider mode={getThemeMode()} brand="secondary">
        <DummyComponent />
    </ThemeProvider>
);
