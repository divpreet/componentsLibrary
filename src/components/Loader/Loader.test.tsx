import * as React from 'react';
import Loader from './Loader';
import { shallow } from 'enzyme';

describe('Loader', () => {
    let LoaderProps;
    beforeEach(() => {
        LoaderProps = {
            isLoading: true,
            a11yId: 'test'
        };
    });

    it('renders correctly', () => {
        const component = shallow(<Loader {...LoaderProps} />).dive();
        expect(component).toMatchSnapshot();
    });

    it('should show loader if isLoading is true', () => {
        const component = shallow(<Loader {...LoaderProps} />);

        expect(component).toBeDefined();
    });

    it('should hide loader if isLoading is false', () => {
        LoaderProps.isLoading = false;

        const component = shallow(<Loader {...LoaderProps} />);

        expect(component).toEqual({});
    });
});
