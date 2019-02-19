import { init } from '../../store';
import logger from 'redux-logger';
import { NotificationEdit } from './NotificationEdit';
import { Provider } from 'react-redux'

describe('NotificationEdit', () => {
    const store = init(logger).getStore();
    const fetchEndpoint = jest.fn();
    const defaultProps = {
        match: {
            params: {
                endpointId: '1'
            }
        },
        fetchEndpoint,
        store
    };

    it('expect to render a Form', () => {
        const wrapper = shallow(
            <NotificationEdit { ...defaultProps }/>
        );
        expect(wrapper.find('Form').length).toBe(1);
    });
});
