import puppeteer from 'puppeteer';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import path from 'path';
import { StoryshotsTestMethod } from '@storybook/addon-storyshots/dist/ts3.9/api/StoryshotsOptions';

const storybookUrl = `file://${path.resolve(__dirname, '../../storybook-static')}`;
const timeout = 100000;
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
});

export const getTestFn: (screenName: string, mode?: 'light' | 'dark') => StoryshotsTestMethod = (
    screenName,
    mode = 'light'
) => {
    let browser;
    const testFn = imageSnapshot({
        storybookUrl: storybookUrl + (mode === 'light' ? '' : '?mode=dark'),
        customizePage: page =>
            page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1 }),
        setupTimeout: timeout,
        testTimeout: timeout,
        getGotoOptions: () => ({ timeout }),
        getMatchOptions: ({ context }) => {
            return {
                // Set failure threshold to be high for font icon as its a large component
                failureThreshold: process.env.UPDATE_SCREENSHOT
                    ? 0
                    : /FontIcon/.exec(context.kind)
                    ? 0.1
                    : 0.003,
                failureThresholdType: 'percent',
                customSnapshotIdentifier: () => {
                    return `${(context as any).id}-${screenName}`;
                }
            };
        },
        getCustomBrowser: async () => {
            browser = await puppeteer.launch({
                product: 'chrome',
                args: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-lcd-text',
                    '--font-render-hinting=none',
                    '--disable-gpu',
                    '--enable-font-antialiasing'
                ]
            });
            return browser;
        },
        beforeScreenshot: async page => {
            await page.addStyleTag({
                content: `* {
                    animation: none !important;
                    transition: none !important;
                }`
            });
        }
    });

    testFn.afterAll = async () => {
        if (browser) {
            await browser.close();
        }
    };
    return testFn;
};
