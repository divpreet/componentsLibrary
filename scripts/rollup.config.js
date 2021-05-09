import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import url from 'rollup-plugin-url';
import svg from 'rollup-plugin-svg';

const input = './src/index.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'styled-components': 'styled'
};
const resolveOptions = { extensions };
const replaceOptions = { preventAssignment: true };
const babelOptions = {
    exclude: /node_modules/,
    configFile: './babel.config.js',
    babelHelpers: 'runtime',
    extensions
};
const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/
};
const typescriptOptions = {};
const urlOptions = {
    // by default, rollup-plugin-url will not handle font files
    include: ['**/*.woff', '**/*.woff2'],
    // setting infinite limit will ensure that the files
    // are always bundled with the code, not copied to /dist
    limit: Infinity
};

function onwarn(warning, warn) {
    // skip certain warnings
    if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
        return;
    }

    // throw on others
    if (warning.code === 'NON_EXISTENT_EXPORT') {
        throw Error(warning.message);
    }

    // Use default for everything else
    warn(warning);
}

export default [
    {
        input,
        onwarn,
        output: {
            file: 'build/umd/dcl.development.js',
            format: 'umd',
            name: 'DCL Components',
            globals
        },
        external: Object.keys(globals),
        plugins: [
            resolve(resolveOptions),
            json(),
            babel(babelOptions),
            commonjs(commonjsOptions),
            nodeGlobals(),
            typescript(typescriptOptions),
            svg(),
            url(urlOptions),
            replace({ 'process.env.NODE_ENV': JSON.stringify('development'), ...replaceOptions })
        ]
    },
    {
        input,
        onwarn,
        output: {
            file: 'build/umd/dcl.production.min.js',
            format: 'umd',
            name: 'DCL Components',
            globals
        },
        external: Object.keys(globals),
        plugins: [
            resolve(resolveOptions),
            json(),
            babel(babelOptions),
            commonjs(commonjsOptions),
            nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
            typescript(typescriptOptions),
            svg(),
            url(urlOptions),
            replace({ 'process.env.NODE_ENV': JSON.stringify('production'), ...replaceOptions }),
            sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
            terser()
        ]
    }
];
