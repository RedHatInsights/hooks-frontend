import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, FormGroup } from '@patternfly/react-core';

export class CustomInputFieldTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.formData ? props.formData : '' };
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

        return <FormGroup
            label={ this.props.schema.title }
            isRequired={ this.props.required }
            fieldId={ `custom-input-${ this.props.name }` }>
            <TextInput value={ value } aria-label={ this.props.schema.title }
                type="text" onChange={ this.handleTextInputChange } />
        </FormGroup>;
    }
}

CustomInputFieldTemplate.propTypes = {
    formData: PropTypes.string,
    onChange: PropTypes.func,
    schema: PropTypes.object,
    name: PropTypes.string,
    required: PropTypes.bool
};

export default CustomInputFieldTemplate;
