import React from 'react';

import Button from './Button';

const cardRow = (props) => {
  const card = props.card;
  const canDecrement = card.get('quantity') > 0;
  const canIncrement = card.get('quantity') < 8;
  const cardId = card.get('id');

  const onFocus = (e) => {
    e.target.select();
  };

  return (
    <tr>
      <td>{card.get('card_set_name')}</td>
      <td>{card.get('name')}</td>
      <td>
        <div className="input-group">
          <div className="input-group-prepend">
            <Button
              disabled={!canDecrement}
              onClick={() => props.onDecrement(cardId)}
            >
              -
            </Button>
          </div>
          <input className="text-center border border-secondary"
                 type="text"
                 value={card.get('quantity')}
                 style={{ display: 'inline-block', width: 40 }}
                 onChange={(e) => props.onUpdateQuantity(cardId, e.target.value)}
                 onFocus={onFocus}
          />
          <div className="input-group-append">
            <Button
              disabled={!canIncrement}
              onClick={() => props.onIncrement(cardId)}
            >
              +
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default cardRow;
