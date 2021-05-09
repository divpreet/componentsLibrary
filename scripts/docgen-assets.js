const fse = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const packagePath = process.cwd();

async function copyAssets() {
    const storybookAssetsPath = path.join(packagePath, './docs/assets');
    const assetsPath = path.join(packagePath, './src/assets');

    try {
        await fse.copy(assetsPath, storybookAssetsPath);
    } catch (err) {
        console.error(chalk.redBright(`npm run docgen-assets: Error: ${err}`));
        process.exit(1);
    }

    console.log(chalk.green('npm run docgen-assets: Assets moved to ./docs folder'));
}

copyAssets();
