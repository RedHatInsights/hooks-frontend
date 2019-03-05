import { NotificationsPage } from './NotificationsPage';

describe('NotificationsPage', () => {
    it('expect to render ', () => {
        const wrapper = shallow(
            <NotificationsPage rightBar="right" title="Something">
                content
            </NotificationsPage>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
