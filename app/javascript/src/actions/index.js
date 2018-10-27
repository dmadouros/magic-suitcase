import * as api from '../api';

export function fetchCardsSucceeded(cards) {
  return {
    type: 'FETCH_CARDS_SUCCEEDED',
    payload: {
      cards,
    },
  };
}

export function fetchCardSetsSucceeded(cardSets) {
  return {
    type: 'FETCH_CARD_SETS_SUCCEEDED',
    payload: {
      cardSets,
    },
  };
}

export function fetchCards() {
  return dispatch => {
    api.fetchCards().then(resp => {
      dispatch(fetchCardsSucceeded(resp.data));
    });
  };
}

export function fetchCardSets() {
  return dispatch => {
    api.fetchCardSets().then(resp => {
      dispatch(fetchCardSetsSucceeded(resp.data));
    });
  };
}

export function incrementQuantityLocal(cardId) {
  return {
    type: 'INCREMENT_QUANTITY',
    payload: {
      cardId,
    },
  };
}

export function incrementQuantity(cardId) {
  return (dispatch, getState) => {
    const card = getState().cards.get('cards').get(cardId);

    api.updateCard(cardId, card.get('quantity') + 1).then(resp => {
      dispatch(incrementQuantityLocal(cardId));
    });
  };
}

export function decrementQuantityLocal(cardId) {
  return {
    type: 'DECREMENT_QUANTITY',
    payload: {
      cardId,
    },
  };
}

export function decrementQuantity(cardId) {
  return (dispatch, getState) => {
    const card = getState().cards.get('cards').get(cardId);

    api.updateCard(cardId, card.get('quantity') - 1).then(resp => {
      dispatch(decrementQuantityLocal(cardId));
    });
  };
}
