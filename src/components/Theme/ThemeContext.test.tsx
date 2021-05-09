import * as React from 'react';
import { useContext } from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { dclStyled, ThemeConsumer, ThemeContext, ThemeProvider, useThemeContext } from './';
import { dclDarkTheme, dclLightTheme } from '../../styles/dclProTheme';

const Dummy: React.FC = () => {
    const { mode, brand } = useContext(ThemeContext);
    return (
        <>
            <>Mode is set to {mode}</>
            <>Brand is set to {brand}</>
        </>
    );
};

const DummyWithUseThemeContext: React.FC = () => {
    const { mode, brand } = useThemeContext();
    return (
        <>
            <>Mode is set to {mode}</>
            <>Brand is set to {brand}</>
        </>
    );
};

describe('Theme', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('Consumer renders correctly', () => {
        const component = shallow(
            <ThemeProvider mode="light">
                <ThemeConsumer>{({ mode }) => <span>Mode is set to: {mode}</span>}</ThemeConsumer>
            </ThemeProvider>
        ).dive();
        expect(component).toMatchSnapshot();
    });

    it('Consumer should return mode', () => {
        const component = mount(
            <ThemeProvider mode="light">
                <ThemeConsumer>{({ mode }) => <span>Mode is set to: {mode}</span>}</ThemeConsumer>
            </ThemeProvider>
        );
        expect(component.text()).toContain('Mode is set to: light');
    });

    it('Consumer should return brand', () => {
        const component = mount(
            <ThemeProvider mode="light" brand="default">
                <ThemeConsumer>
                    {({ brand }) => <span>Brand is set to: {brand}</span>}
                </ThemeConsumer>
            </ThemeProvider>
        );
        expect(component.text()).toContain('Brand is set to: default');
    });

    it('Consumer should return a method to set mode', () => {
        const component = mount(
            <ThemeProvider mode="light">
                <ThemeConsumer>
                    {({ mode, setMode }) => {
                        setTimeout(() => {
                            setMode('dark');
                        });
                        return <span>Mode is set to: {mode}</span>;
                    }}
                </ThemeConsumer>
            </ThemeProvider>
        );
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(component.text()).toContain('Mode is set to: dark');
    });

    it('Consumer should return a method to set brand', () => {
        const component = mount(
            <ThemeProvider mode="light">
                <ThemeConsumer>
                    {({ brand, setBrand }) => {
                        setTimeout(() => {
                            setBrand('secondary');
                        });
                        return <span>Brand is set to: {brand}</span>;
                    }}
                </ThemeConsumer>
            </ThemeProvider>
        );
        act(() => {
            jest.runOnlyPendingTimers();
        });
        expect(component.text()).toContain('Brand is set to: secondary');
    });

    it('Context renders correctly', () => {
        const component = shallow(
            <ThemeProvider mode="light">
                <Dummy />
            </ThemeProvider>
        ).dive();
        expect(component).toMatchSnapshot();
    });

    it('Context should return mode to child components', () => {
        const component = mount(
            <ThemeProvider mode="light">
                <Dummy />
            </ThemeProvider>
        );
        expect(component.text()).toContain('Mode is set to light');
    });

    it('Context should return brand to child components', () => {
        const component = mount(
            <ThemeProvider mode="light">
                <Dummy />
            </ThemeProvider>
        );
        expect(component.text()).toContain('Brand is set to default');
    });

    it('Context should return a method to set mode to child components', () => {
        const ModeChanger: React.FC = () => {
            const { setMode } = useContext(ThemeContext);
            setTimeout(() => {
                setMode('dark');
            });
            return <></>;
        };
        const component = mount(
            <ThemeProvider>
                <Dummy />
                <ModeChanger />
            </ThemeProvider>
        );
        act(() => {
            jest.runOnlyPendingTimers();
        });
        component.update();
        expect(component.text()).toContain('Mode is set to dark');
    });

    it('Context should return a method to set brand to child components', () => {
        const BrandChanger: React.FC = () => {
            const { setBrand } = useContext(ThemeContext);
            setTimeout(() => {
                setBrand('secondary');
            });
            return <></>;
        };
        const component = mount(
            <ThemeProvider mode="dark">
                <Dummy />
                <BrandChanger />
            </ThemeProvider>
        );
        act(() => {
            jest.runOnlyPendingTimers();
        });
        component.update();
        expect(component.text()).toContain('Brand is set to secondary');
    });

    it('useThemeContext renders correctly', () => {
        const component = shallow(
            <ThemeProvider mode="light">
                <DummyWithUseThemeContext />
            </ThemeProvider>
        ).dive();
        expect(component).toMatchSnapshot();
    });

    it('useThemeContext should return mode to child components', () => {
        const component = mount(
            <ThemeProvider mode="light">
                <DummyWithUseThemeContext />
            </ThemeProvider>
        );
        expect(component.text()).toContain('Mode is set to light');
    });

    it('useThemeContext should return brand to child components', () => {
        const component = mount(
            <ThemeProvider mode="light">
                <DummyWithUseThemeContext />
            </ThemeProvider>
        );
        expect(component.text()).toContain('Brand is set to default');
    });

    it('useThemeContext should return a method to set mode to child components', () => {
        const ModeChanger: React.FC = () => {
            const { setMode } = useThemeContext();
            setTimeout(() => {
                setMode('dark');
            });
            return <></>;
        };
        const component = mount(
            <ThemeProvider>
                <DummyWithUseThemeContext />
                <ModeChanger />
            </ThemeProvider>
        );
        act(() => {
            jest.runOnlyPendingTimers();
        });
        component.update();
        expect(component.text()).toContain('Mode is set to dark');
    });

    it('useThemeContext should return a method to set brand to child components', () => {
        const BrandChanger: React.FC = () => {
            const { setBrand } = useThemeContext();
            setTimeout(() => {
                setBrand('secondary');
            });
            return <></>;
        };
        const component = mount(
            <ThemeProvider mode="dark">
                <DummyWithUseThemeContext />
                <BrandChanger />
            </ThemeProvider>
        );
        act(() => {
            jest.runOnlyPendingTimers();
        });
        component.update();
        expect(component.text()).toContain('Brand is set to secondary');
    });

    it('provides an dclStyled method that renders with DCL Pro light theme as default theme', () => {
        const DivStyled = dclStyled('div')`${props => {
            expect(props.theme).toEqual(dclLightTheme);
        }}`;
        mount(<DivStyled />);
    });

    it('provides an dclStyled object that renders dom elements with DCL Pro light theme as default theme', () => {
        const DivStyled = dclStyled.div`${props => {
            expect(props.theme).toEqual(dclLightTheme);
        }}`;
        mount(<DivStyled />);
    });

    it('provides an dclStyled method that renders with selected theme if wrapped inside ThemeProvider', () => {
        const DivStyled = dclStyled('div')`${props => {
            expect(props.theme).toEqual(dclDarkTheme);
        }}`;

        mount(
            <ThemeProvider mode="dark" brandColour="#ffffff">
                <DivStyled />
            </ThemeProvider>
        );
    });

    it('provides an dclStyled object that renders dom elements with selected theme if wrapped inside ThemeProvider', () => {
        const DivStyled = dclStyled.div`${props => {
            expect(props.theme).toEqual(dclDarkTheme);
        }}`;

        mount(
            <ThemeProvider mode="dark">
                <DivStyled />
            </ThemeProvider>
        );
    });
});
