import { Messages } from './Messages';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Messages', () => {
    it('expect to render', () => {
        const messages = [
            { id: 0, variant: 'info', title: 'Info', message: 'This is an info' },
            { id: 1, variant: 'success', title: 'Success', message: 'This is an success' },
            { id: 2, variant: 'warning', title: 'Warning', message: 'This is an warning' },
            { id: 3, variant: 'danger', title: 'Danger', message: 'This is an danger' },
        ];
        const wrapper = shallow(
            <Router>
                <Messages messages={ messages } />
            </Router>
        );

        expect(wrapper.render()).toMatchSnapshot();
    });
});
