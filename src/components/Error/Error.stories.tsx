import * as React from 'react';
import { Story } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Error, { ErrorProps } from './Error';

export default {
    title: 'Surfaces / Error',
    component: Error,
    componentSubtitle: 'Displays an Error page',
    decorators: [withKnobs]
};

const props: ErrorProps = {
    heading: 'Test error heading',
    message: 'Test error message',
    secondaryMessage: 'Test secondary message',
    resetBtn: {
        text: 'Reset text',
        iconClass: 'icon-back',
        onClick: () => {
            console.log('test');
        }
    }
};

const getThemedComponent = (args?) => {
    return <Error {...args} />;
};

export const component: Story = () => {
    return getThemedComponent();
};

export const WithAllProps: Story = () => {
    const properties = { ...props };
    return getThemedComponent(properties);
};

export const SmallVariant: Story = () => {
    const variant: 'small' | 'standard' = 'small';
    const properties = { ...props, variant };
    return getThemedComponent(properties);
};

export const WithoutHeading: Story = () => {
    const properties = { ...props };
    properties.heading = undefined;
    return getThemedComponent(properties);
};

export const WithoutMessage: Story = () => {
    const properties = { ...props };
    properties.message = undefined;
    return getThemedComponent(properties);
};

export const WithoutSecondaryMessage: Story = () => {
    const properties = { ...props };
    properties.secondaryMessage = undefined;
    return getThemedComponent(properties);
};

export const WithoutResetBtn: Story = () => {
    const properties = { ...props };
    properties.resetBtn = undefined;
    return getThemedComponent(properties);
};

export const WithoutResetBtnText: Story = () => {
    const properties = { ...props };
    properties.resetBtn.text = undefined;
    return getThemedComponent(properties);
};

export const WithoutResetBtnIcon: Story = () => {
    const properties = { ...props };
    properties.resetBtn.iconClass = undefined;
    return getThemedComponent(properties);
};
