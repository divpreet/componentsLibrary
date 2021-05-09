import * as React from 'react';
import Error, { ErrorProps } from './Error';
import { mount, shallow } from 'enzyme';

let props: ErrorProps;

describe('Error', () => {
    beforeEach(() => {
        props = {
            heading: 'Test error heading',
            message: 'Test error message',
            secondaryMessage: 'Test secondary message',
            resetBtn: {
                text: 'Reset text',
                iconClass: 'icon-back',
                onClick: jest.fn()
            }
        };
    });

    it('renders correctly', () => {
        const component = shallow(<Error {...props} />).dive();
        expect(component).toMatchSnapshot();
    });

    it('should display error heading, message, logo, secondary message and button', () => {
        const component = mount(<Error {...props} />);

        expect(component.find('h1').text()).toContain('Test error heading');
        expect(component.find('h2').text()).toContain('Test error message');
        expect(component.find('h3').text()).toContain('Test secondary message');
        const resetBtn = component.find('button');
        expect(resetBtn.text()).toContain('Reset text');
        expect(resetBtn.find('.icon-back').length).toBe(1);
        resetBtn.simulate('click');
        expect(props.resetBtn.onClick).toHaveBeenCalled();
    });

    it('should display default error heading, message, logo if not available', () => {
        const component = mount(<Error />);

        expect(component.find('h1').text()).toContain('Error');
        expect(component.find('h2').text()).toContain('An error occurred.');
        expect(component.find('h3').length).toBe(0);
        expect(component.find('button').length).toBe(0);
    });

    it('should display default reset btn text if not available', () => {
        const properties = { ...props, resetBtn: { onClick: jest.fn() } };
        const component = mount(<Error {...properties} />);

        const resetBtn = component.find('button');
        expect(resetBtn.text()).toContain('Reset');
        expect(resetBtn.find('.icon').length).toBe(0);
        resetBtn.simulate('click');
        expect(properties.resetBtn.onClick).toHaveBeenCalled();
    });
});
