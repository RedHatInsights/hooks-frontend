import { IndexToolbar } from './IndexToolbar';
import { Link, BrowserRouter as Router } from 'react-router-dom';

describe('IndexToolbar', () => {
    it('expect to render', () => {
        const wrapper = shallow(
            <Router>
                <IndexToolbar onClick={ jest.fn() } />
            </Router>
        );

        expect(wrapper.render().find('a[href="/new"]').text()).toBe('New endpoint');
        expect(wrapper.render()).toMatchSnapshot();
    });
});
