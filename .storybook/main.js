module.exports = {
    stories: ['../src/**/*.stories.@(js|jsx|mdx|ts|tsx)'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-knobs',
        '@storybook/addon-actions',
        '@storybook/addon-a11y',
        '@storybook/addon-links',
        '@storybook/addon-viewport',
        'storybook-addon-designs',
        'storybook-dark-mode'
    ]
};
