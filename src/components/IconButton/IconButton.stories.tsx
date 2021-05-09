import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import IconButton from './IconButton';

export default {
    title: 'Inputs / IconButton',
    component: IconButton,
    componentSubtitle: 'Displays a IconButton',
    decorators: [withKnobs]
};

const spacer = <span style={{ display: 'inline-block', marginRight: 16 }} />;

export const component: Story = () => {
    return (
        <div>
            <IconButton
                a11yId="1"
                icon={<span className="icon icon-cube-outline" />}
                text={text('text', 'Icon Button', '1')}
                ariaLabel={text('ariaLabel', 'Icon Button', '1')}
                disabled={boolean('disabled', false, '1')}
                onClickHandler={() => {
                    action('onClickHandler');
                }}
            />
            {spacer}
            <IconButton
                a11yId="123"
                icon={<span className="icon icon-earth" />}
                text={text('text', 'Icon Button', '123')}
                disabled={boolean('disabled', true, '123')}
                onClickHandler={() => {
                    action('onClickHandler');
                }}
            />
        </div>
    );
};

export const roundedDefault: Story = () => {
    return (
        <div>
            <IconButton
                a11yId="1"
                icon={<span className="icon icon-cube-outline" />}
                text={text('text', 'Icon Button', '1')}
                ariaLabel={text('ariaLabel', 'Icon Button', '1')}
                disabled={boolean('disabled', false, '1')}
                onClickHandler={() => {
                    action('onClickHandler');
                }}
                rounded
            />
        </div>
    );
};

export const roundedDisabled: Story = () => {
    return (
        <div>
            <IconButton
                a11yId="123"
                icon={<span className="icon icon-earth" />}
                text={text('text', 'Icon Button', '123')}
                disabled={boolean('disabled', true, '123')}
                onClickHandler={() => {
                    action('onClickHandler');
                }}
                rounded
            />
        </div>
    );
};

export const roundedPrimary: Story = () => {
    return (
        <div>
            <IconButton
                a11yId="123"
                icon={<span className="icon icon-earth" />}
                text={text('text', 'Icon Button', '123')}
                disabled={boolean('disabled', false, '123')}
                onClickHandler={() => {
                    action('onClickHandler');
                }}
                accent
                rounded
            />
        </div>
    );
};
