import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="main"
      style={{
        width: '100px',
        height: '100px',
        display: 'block',
        margin: 'auto',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
