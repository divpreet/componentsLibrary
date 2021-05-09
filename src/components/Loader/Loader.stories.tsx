import * as React from 'react';
import { Story } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import Loader from './Loader';

export default {
    title: 'Components / Loader',
    component: Loader,
    componentSubtitle: 'Displays a Loader'
};

export const withKnobs: Story = () => (
    <Loader
        a11yId={text('Id', 'loader')}
        isLoading={boolean('Is Loading?', true)}
        size={number('Size', 50)}
    />
);
