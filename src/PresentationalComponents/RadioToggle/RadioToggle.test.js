import { RadioToggle, ALL, SELECTED } from './RadioToggle';

describe('RadioToggle', () => {
    const scope = 'my-app-1';
    const defaultProps = { scope };

    it('expect to render just one radio on all', () => {
        const wrapper = shallow(
            <RadioToggle { ...defaultProps } initial={ ALL }>
                Something
            </RadioToggle>
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('expect to render children on selected', () => {
        const wrapper = shallow(
            <RadioToggle { ...defaultProps } initial={ SELECTED }>
                Something
            </RadioToggle>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
