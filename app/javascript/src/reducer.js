import {fromJS, Map, List} from 'immutable';

const INITIAL_STATE = Map({

  cards: Map({
    entities: Map(),
    filters: Map({
      name: '',
      cardSetIds: List([]),
    })
  }),
  cardSets: Map(),
  deckContents: '',
  deckName: '',
  decks: Map({
    entities: Map(),
    ids: List(),
    filters: Map({
      name: ''
    }),
  }),
  isLoading: false,
  order: '',
  picklist: '',
  orderLoaded: false,
});

export const getCards = (state) => {
  const cardSets = state.cards.get('cardSets');

  return state.cards.get('cards').get('entities').valueSeq()
    .filter(card => {
      if (state.cards.getIn(['cards', 'filters', 'cardSetIds']).isEmpty()) {
        return true;
      } else {
        return state.cards.getIn(['cards', 'filters', 'cardSetIds']).includes(card.get('card_set_id'));
      }
    })
    .map(card => {
      return card.set('card_set_name', cardSets.get(card.get('card_set_id')).get('abbreviation'));
    })
    .toList()
    .filter(card => {
      if (getCardFilterName(state)) {
        return (new RegExp(getCardFilterName(state), 'i')).test(card.get('name'));
      } else {
        return true;
      }
    })
    .sortBy(card => [card.get('card_set_name'), card.get('name')]);
};

export const getDeckContents = (state) => {
  return state.deckContents;
}

export const getDeckName = (state) => {
  return state.deckName;
}

export const getDecks = (state) => {
  return state.cards.get('decks').get('ids')
    .map(id => getDeck(state, id))
    .filter(deck => {
      if (getDeckFilterName(state)) {
        return (new RegExp(getDeckFilterName(state), 'i')).test(deck.get('name'));
      } else {
        return true;
      }
    })
    .toJS();
}

export const getDeck = (state, id) => {
  return state.cards.get('decks').get('entities').get(id);
}

export const getDeckFilterName = (state) => {
  return state.cards.get('decks').get('filters').get('name');
}

export const getCardFilterName = (state) => {
  return state.cards.get('cards').get('filters').get('name');
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CARDS_STARTED': {
      return state.set('isLoading', true);
    }
    case 'FETCH_CARDS_SUCCEEDED': {
      return state.setIn(['cards', 'entities'], fromJS(action.payload.cards)).set('isLoading', false);
    }
    case 'FETCH_CARD_SETS_SUCCEEDED': {
      return state.set('cardSets', fromJS(action.payload.cardSets));
    }
    case 'INCREMENT_QUANTITY': {
      const card = state.getIn(['cards', 'entities']).get(action.payload.cardId);
      return state.setIn(['cards', 'entities', action.payload.cardId, 'quantity'], card.get('quantity') + 1)
    }
    case 'DECREMENT_QUANTITY': {
      const card = state.getIn(['cards', 'entities']).get(action.payload.cardId);
      return state.setIn(['cards', 'entities', action.payload.cardId, 'quantity'], card.get('quantity') - 1)
    }
    case 'FETCH_DECKS_STARTED': {
      return state.set('isLoading', true);
    }
    case 'FETCH_DECKS_SUCCEEDED': {
      return state
        .setIn(['decks', 'entities'], fromJS(action.payload.decks.entities))
        .setIn(['decks', 'ids'], fromJS(action.payload.decks.ids))
        .set('isLoading', false);
    }
    case 'SET_DECK_CONTENTS': {
      return state.set('deckContents', action.payload.deckContents);
    }
    case 'SET_DECK_NAME': {
      return state.set('deckName', action.payload.name);
    }
    case 'SAVE_DECK_SUCCEEDED': {
      return state;
    }
    case 'BUILD_DECK_STARTED': {
      return state.set('isLoading', true);
    }
    case 'BUILD_DECK_SUCCEEDED': {
      return state
        .set('order', action.payload.order)
        .set('picklist', action.payload.picklist)
        .set('isLoading', false);
    }
    case 'SET_DECK_NAME_FILTER': {
      return state.setIn(['decks', 'filters', 'name'], action.payload.name);
    }
    case 'SET_CARD_NAME_FILTER': {
      return state.setIn(['cards', 'filters', 'name'], action.payload.name);
    }
    case 'ADD_CARD_SET_FILTER': {
      const cardSetIds = state.getIn(['cards', 'filters', 'cardSetIds']);

      return state.setIn(['cards', 'filters', 'cardSetIds'], cardSetIds.push(action.payload.cardSetId));
    }
    case 'REMOVE_CARD_SET_FILTER': {
      const cardSetIds = state.getIn(['cards', 'filters', 'cardSetIds']);
      console.log(cardSetIds.toJS())
      const cardSetIdIndex = cardSetIds.indexOf(action.payload.cardSetId);
      console.log(cardSetIdIndex);

      return state.setIn(['cards', 'filters', 'cardSetIds'], cardSetIds.remove(cardSetIdIndex));
    }
    default: {
      return state;
    }
  }
}
