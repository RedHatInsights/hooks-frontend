import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup } from '@patternfly/react-core';

export class CustomBooleanFieldTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.formData };
    }

    state = {
        value: false
    };

    handleTextInputChange = value => {
        this.props.onChange(value);
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return <FormGroup>
            <p>
                <Checkbox
                    label={ this.props.schema.title }
                    aria-label={ this.props.schema.title }
                    defaultChecked={ value }
                    onChange={ this.handleTextInputChange }
                    id={ `custom-checkbox-${ this.props.name }` }
                    key={ `custom-checkbox-${ this.props.name }-key` }
                />
            </p>
        </FormGroup>;
    }
}
CustomBooleanFieldTemplate.propTypes = {
    formData: PropTypes.bool.isRequired,
    schema: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CustomBooleanFieldTemplate;
