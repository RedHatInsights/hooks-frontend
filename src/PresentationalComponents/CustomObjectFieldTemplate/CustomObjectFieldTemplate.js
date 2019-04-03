import React from 'react';
import PropTypes from 'prop-types';

export const CustomObjectFieldTemplate = ({ title, description, properties }) => {
    return (
        <div>
            { title }
            { description }
            { properties.map(element => (
                element.content
            )) }
        </div>
    );
};

CustomObjectFieldTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};
