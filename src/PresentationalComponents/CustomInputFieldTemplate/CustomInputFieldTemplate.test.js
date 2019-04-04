import toJson from 'enzyme-to-json';

import { CustomInputFieldTemplate } from './CustomInputFieldTemplate';

describe('CustomInputFieldTemplate', () => {
    it('expect to render', () => {
        const testProps = {
            formData: 'Test Form Data',
            schema: {
                title: 'Test Input Field'
            },
            onChange: jest.fn(),
            name: 'test-input-field',
            required: true
        };

        const wrapper = shallow(
            <CustomInputFieldTemplate { ...testProps } />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
