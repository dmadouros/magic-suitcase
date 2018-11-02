import React from 'react';

const button = (props) => {
  return (
    <button className="btn btn-outline-secondary"
            type="button"
            disabled={props.disabled}
            onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default button;
