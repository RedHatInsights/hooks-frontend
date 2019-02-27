import { FilterList } from './FilterList';

describe('FilterList', () => {
    it('expect to render', () => {
        const wrapper = shallow(
            <FilterList filters={ [] } apps={ [] }/>
        );

        expect(wrapper.render()).toMatchSnapshot();
    });
});
