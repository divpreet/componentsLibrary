import initStoryshots from '@storybook/addon-storyshots';
import { getTestFn } from './snapshotTestHelper';

initStoryshots({
    suite: 'Wide-dark',
    test: getTestFn('Wide-dark', 'dark')
});
