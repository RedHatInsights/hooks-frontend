import { Messages } from './Messages';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Messages', () => {
    it('expect to render', () => {
        const messages = [ 'info', 'success', 'warning', 'danger' ].map(kind => (
            { id: kind, variant: kind, title: kind, message: kind }
        ));
        const wrapper = shallow(
            <Router>
                <Messages messages={ messages } />
            </Router>
        );

        expect(wrapper.render()).toMatchSnapshot();
    });
});
