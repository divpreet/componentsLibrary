import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });
