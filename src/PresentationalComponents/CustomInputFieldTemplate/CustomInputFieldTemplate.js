import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, FormGroup } from '@patternfly/react-core';

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

        return <FormGroup
            label={ this.props.schema.title }
            isRequired={ this.props.required }
            fieldId={ `custom-input-${ this.props.name }` }>
            <TextInput value={ value } aria-label={ this.props.schema.title }
                type="text" onChange={ this.handleTextInputChange } label={ false } />
        </FormGroup>;
    }
}

CustomInputFieldTemplate.propTypes = {
    formData: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired
};

export default CustomInputFieldTemplate;
