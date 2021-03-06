import React from 'react';

import CardRow from './CardRow';

const cardTable = (props) => {
  const cardRows = props.cards.valueSeq().map(card => <CardRow
      key={card.get('id')} card={card}
      onIncrement={props.onIncrement}
      onDecrement={props.onDecrement}
      onUpdateQuantity={props.onUpdateQuantity}
    />
  );

  return (
    <div className="row">
      <div className="col">
        <table className="table table-striped table-sm">
          <thead className="thead-dark">
          <tr>
            <th>Set</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
          </thead>
          <tbody>
          {cardRows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default cardTable;
