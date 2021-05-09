import * as React from 'react';
import IconButton from './IconButton';
import { mount, shallow } from 'enzyme';

const onClickHandler = jest.fn();
const props = {
    a11yId: '23234',
    disabled: true,
    onClickHandler,
    text: 'text',
    icon: <span className="icon icon-earth" />
};

describe('IconButton', () => {
    let buttonProps = props;

    beforeEach(() => {
        buttonProps = {
            ...props
        };
    });

    it('renders correctly', () => {
        const component = shallow(<IconButton {...buttonProps} />).dive();
        expect(component).toMatchSnapshot();
    });

    test('should display with icon', () => {
        const component = mount(<IconButton {...buttonProps} />);
        const icon = component.find('icon-earth');

        expect(icon).toBeDefined();
    });

    test('should display rounded button with icon', () => {
        const component = mount(<IconButton {...buttonProps} rounded />);
        const icon = component.find('icon-earth');

        expect(icon).toBeDefined();
    });

    test('should display rounded accent button with icon', () => {
        const component = mount(<IconButton {...buttonProps} rounded accent />);
        const icon = component.find('icon-earth');

        expect(icon).toBeDefined();
    });

    it('should render hidden label', () => {
        const component = mount(<IconButton {...props} />);
        const text = component.find('.dclIconButton__text');

        expect(text.text()).toEqual(props.text);
    });

    it('should fire onClickHandler when clicked', () => {
        const component = shallow(<IconButton {...props} />);

        component.simulate('click');

        expect(onClickHandler.mock.calls.length).toEqual(1);
    });
});
