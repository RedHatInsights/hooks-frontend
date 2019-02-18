import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';
import { fetchEndpoint, createEndpoint, updateEndpoint } from '../../store/actions';
import { connect } from 'react-redux';
import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';

const schema = {
    title: 'Edit Notifications',
    type: 'object',
    required: [ 'name', 'url' ],
    properties: {
        name: { type: 'string', title: 'Name' },
        active: { type: 'boolean', title: 'Active', default: true },
        url: { type: 'string', title: 'URL' }
    }
};

const uiSchema = {
    name: {
        'ui:placeholder': 'New notification endpoint name'
    },
    url: {
        'ui:placeholder': 'https://...'
    }
};

function CustomFieldTemplate(props) {
    const { id, classNames, label, help, required, description, errors, children } = props;
    let allClassNames = classNames.concat([ ' pf-c-form__group' ]);

    return (
        <div className={ allClassNames }>
            <label htmlFor={ id }>{ label } { required ? '*' : null }</label>
            { description }
            { children }
            { errors }
            { help }
        </div>
    );
}

CustomFieldTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.object,
    required: PropTypes.bool,
    description: PropTypes.object,
    errors: PropTypes.object,
    children: PropTypes.array
};

@registryDecorator()
export class NotificationEdit extends Component {
    componentDidMount() {
        this.props.fetchEndpoint(this.props.match.params.endpointId);
    }

    formChange = () => {}

    formSubmit = (data) => {
        let { active, name, url } = data.formData;
        let payload = {
            active,
            name,
            url
        };
        if (typeof this.props.endpoint.id === 'undefined') {
            this.props.createEndpoint(payload);
        } else {
            this.props.updateEndpoint(this.props.endpoint.id, payload);
        }
    };

    initialFormData = () => {
        return this.props.endpoint ? {
            name: this.props.endpoint.name,
            url: this.props.endpoint.url,
            active: this.props.endpoint.active
        } : {};
    }

    render() {
        if (this.props.loading) {
            return 'Loading ...';
        }

        return (
            <Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Edit Notification'/>
                </PageHeader>
                <Main>
                    <Form schema={ schema } className="pf-c-form"
                        uiSchema={ uiSchema }
                        formData={ this.initialFormData() }
                        onChange={ this.formChange }
                        onSubmit={ this.formSubmit }
                        FieldTemplate={ CustomFieldTemplate } />
                </Main>
            </Fragment>
        );
    }
}

NotificationEdit.propTypes = {
    endpointId: PropTypes.number,
    endpoint: PropTypes.object,
    fetchEndpoint: PropTypes.func.isRequired,
    createEndpoint: PropTypes.func,
    updateEndpoint: PropTypes.func,
    match: PropTypes.object,
    loading: PropTypes.bool,
    create: PropTypes.bool
};

const mapStateToProps = function(state) {
    return {
        endpoint: state.endpoints.endpoint,
        loading: state.endpoints.loading
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        fetchEndpoint,
        createEndpoint,
        updateEndpoint
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotificationEdit));
