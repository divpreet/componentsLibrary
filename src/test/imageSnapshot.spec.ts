import initStoryshots from '@storybook/addon-storyshots';
import { getTestFn } from './snapshotTestHelper';

// TODO: DCLCL don't seem to need device testing just yet,
// TODO: this is available if we need it - move these to individual spec files
// const supportedDevices = ['iPad', 'iPhone X'];
// const createCustomizePage = pupDevice => page => page.emulate(pupDevice);
// for (const supportedDevice of supportedDevices) {
//     const pupDevice = puppeteer.devices[supportedDevice];
//
//     if (!pupDevice) {
//         continue;
//     }
//
//     const customizePage = createCustomizePage(pupDevice);
//
//     initStoryshots({
//         suite: `${pupDevice.name}`,
//         test: getTestFn(customizePage, pupDevice.name),
//         storyKindRegex: /^((?!.*FontIcon).)*$/
//     });
// }

initStoryshots({
    suite: 'Wide',
    test: getTestFn('Wide')
});
