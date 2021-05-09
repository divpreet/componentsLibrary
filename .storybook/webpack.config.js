const path = require('path');

module.exports = async ({ config, mode }) => {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.mdx?$/,
                    use: ['babel-loader', '@mdx-js/loader']
                },
                {
                    test: /\.(stories)\.(js|jsx)?$/,
                    loader: require.resolve('@storybook/source-loader'),
                    exclude: [/node_modules/]
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                esModule: false
                            }
                        }
                    ],
                    include: path.resolve(__dirname, '../')
                }
            ]
        }
    };
};
