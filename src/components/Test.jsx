import PropTypes from 'prop-types';
import React from 'react';

const TestComponent = ({ name }) => {
  return <div>Hello, {name}</div>;
};

TestComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TestComponent;
