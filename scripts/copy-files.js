/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src');

async function includeFileInBuild(file) {
    const sourcePath = path.resolve(packagePath, file);
    const targetPath = path.resolve(buildPath, path.basename(file));
    await fse.copy(sourcePath, targetPath);
    console.log(chalk.green(`npm run build: Copied ${sourcePath} to ${targetPath}`));
}

async function copyStyleGuide() {
    // TODO: Add styles to external package
    // Ideally, styles should be centralised in one place.
    // Because we are exporting components seperately,
    // they cannot reference a file relatively.
    const stylePath = path.join(packagePath, './src/styles');

    const esmPath = path.join(packagePath, './build/esm/styles');
    const esPath = path.join(packagePath, './build/es/styles');
    const rootPath = path.join(packagePath, './build/styles');

    const filesToCopy = [];
    await fse.readdirSync(stylePath).forEach(file => {
        if (/.*(.json)$/.test(file)) {
            filesToCopy.push(file);
        }
    });

    await Promise.all(
        [esmPath, esPath, rootPath].map(async outputPath => {
            if (!fse.existsSync(outputPath)) {
                fse.mkdirSync(outputPath);
            }
            return await Promise.all(
                filesToCopy.map(
                    async file => await fse.copy(`${stylePath}/${file}`, `${outputPath}/${file}`)
                )
            );
        })
    );

    console.log(chalk.green('npm run build: Styles moved to ./build folder'));
}

async function copyAssets() {
    const assetsPath = path.join(packagePath, './src/assets');
    const esmPath = path.join(packagePath, './build/esm/assets');
    const esPath = path.join(packagePath, './build/es/assets');
    const rootPath = path.join(packagePath, './build/assets');

    await Promise.all([
        fse.copy(assetsPath, esmPath),
        fse.copy(assetsPath, esPath),
        fse.copy(assetsPath, rootPath)
    ]);

    console.log(chalk.green('npm run build: Assets moved to ./build folder'));
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from 'dcl/typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in typescript by checking
 * if an index.d.ts is present at that path.
 *
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
    const directoryPackages = glob.sync('*/index.js', { cwd: from }).map(path.dirname);

    await Promise.all(
        directoryPackages.map(async directoryPackage => {
            return path.join(to, directoryPackage, 'package.json');
        })
    );
}

async function createPackageFile() {
    const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
    const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } = JSON.parse(
        packageData
    );
    const newPackageData = {
        ...packageDataOther,
        private: false,
        main: './index.js',
        types: './index.d.ts'
    };
    const targetPath = path.resolve(buildPath, './package.json');

    await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
    console.log(chalk.green(`npm run build: Created package.json in ${targetPath}`));

    return newPackageData;
}

async function prepend(file, string) {
    const data = await fse.readFile(file, 'utf8');
    await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData) {
    const license = `/** @license Component Corporation v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
    await Promise.all(
        [
            './index.js',
            './esm/index.js',
            './umd/dcl.development.js',
            './umd/dcl.production.min.js'
        ].map(async file => {
            try {
                await prepend(path.resolve(buildPath, file), license);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.log(`Skipped license for ${file}`);
                } else {
                    throw err;
                }
            }
        })
    );
}

async function run() {
    try {
        const packageData = await createPackageFile();

        await Promise.all(['./README.md'].map(file => includeFileInBuild(file)));

        await copyStyleGuide();

        await copyAssets();

        await addLicense(packageData);

        await createModulePackages({ from: srcPath, to: buildPath });
    } catch (err) {
        console.error(chalk.redBright(`npm run build: Error: ${err}`));
        process.exit(1);
    }
}

run();
