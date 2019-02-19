import { init } from '../../store';
import logger from 'redux-logger';

import { NotificationsIndex } from './NotificationsIndex';

describe('NotificationsIndex', () => {
    const store = init(logger).getStore();
    const defaultProps = {
        fetchFilters: jest.fn(),
        fetchEndpoints: jest.fn(),
        filters: [],
        endpoints: [],
        store
    };

    it('expect to render a Table', () => {
        const wrapper = shallow(
            <NotificationsIndex { ...defaultProps }/>
        );
        expect(wrapper.find('Table').length).toBe(1);
    });
});
