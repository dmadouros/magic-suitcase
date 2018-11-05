import React from 'react';

const title = (props) => {
  return (
    <div className="row">
      <div className="col">
        <h1 className="mt-4">{props.children}</h1>
      </div>
    </div>
  );
};

export default title;
