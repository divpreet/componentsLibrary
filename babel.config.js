const { NODE_ENV, BABEL_ENV } = process.env;

const inProduction = NODE_ENV === 'production';

module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV);

    const config = {
        presets: [
            '@babel/react',
            [
                '@babel/preset-env',
                {
                    modules: !inProduction || BABEL_ENV === 'cjs' ? 'commonjs' : false
                }
            ],
            '@babel/preset-typescript'
        ],
        plugins: ['react-docgen', ['@babel/plugin-transform-runtime']]
    };

    if (inProduction) {
        config.plugins.push(
            [
                'babel-plugin-import',
                {
                    libraryName: '@material-ui/core',
                    libraryDirectory: '',
                    camel2DashComponentName: false
                },
                'core'
            ],
            [
                'babel-plugin-import',
                {
                    libraryName: '@material-ui/icons',
                    libraryDirectory: '',
                    camel2DashComponentName: false
                },
                'icons'
            ]
        );
    }
    return config;
};
