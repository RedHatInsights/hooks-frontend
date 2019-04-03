import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '@patternfly/react-core';

export class CustomInputFieldTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.formData };
    }

    state = {
        value: ''
    };

    handleTextInputChange = value => {
        this.props.onChange(value);
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return <TextInput value={ value }
            type="text" onChange={ this.handleTextInputChange } />;
    }
}
CustomInputFieldTemplate.propTypes = {
    formData: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CustomInputFieldTemplate;
