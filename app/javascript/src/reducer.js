import { fromJS, Map } from 'immutable';

const INITIAL_STATE = Map({
  cards: Map(),
  cardSets: Map(),
});

export const getCards = (state) => {
  const cardSets = state.cards.get('cardSets');

  return state.cards.get('cards').valueSeq().map(card => {
    return card.set('card_set_name', cardSets.get(card.get('card_set_id')).get('abbreviation'));
  }).toList().sortBy(card => [card.get('card_set_name'), card.get('name')]);
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CARDS_SUCCEEDED': {
      return state.set('cards', fromJS(action.payload.cards));
    }
    case 'FETCH_CARD_SETS_SUCCEEDED': {
      return state.set('cardSets', fromJS(action.payload.cardSets));
    }
    case 'INCREMENT_QUANTITY': {
      const card = state.get('cards').get(action.payload.cardId);
      return state.setIn(['cards', action.payload.cardId, 'quantity'], card.get('quantity') + 1)
    }
    case 'DECREMENT_QUANTITY': {
      const card = state.get('cards').get(action.payload.cardId);
      return state.setIn(['cards', action.payload.cardId, 'quantity'], card.get('quantity') - 1)
    }
    default: {
      return state;
    }
  }
}
