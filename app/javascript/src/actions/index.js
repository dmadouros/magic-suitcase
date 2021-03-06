import * as api from '../api';

/*
 * CARDS
 */
export function fetchCards() {
  return dispatch => {
    dispatch(fetchCardsStarted());

    api.fetchCards().then(resp => {
      dispatch(fetchCardsSucceeded(resp.data));
    });
  };
}

export function fetchCardsStarted() {
  return {
    type: 'FETCH_CARDS_STARTED'
  }
}

export function fetchCardsSucceeded(cards) {
  return {
    type: 'FETCH_CARDS_SUCCEEDED',
    payload: {
      cards,
    },
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
    const card = getState().cards.get('cards').get('entities').get(cardId);

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

export function updateQuantityStarted() {
  return {
    type: 'UPDATE_QUANTITY_STARTED',
  }
}

export function updateQuantitySucceeded(cardId, quantity) {
  return {
    type: 'UPDATE_QUANTITY_SUCCEEDED',
    payload: {
      cardId,
      quantity,
    },
  }
}

export function updateQuantity(cardId, quantity) {
  return dispatch => {
    api.updateCard(cardId, parseInt(quantity)).then(resp => {
      dispatch(updateQuantitySucceeded(cardId, parseInt(quantity)))
    });
  };
}

export function decrementQuantity(cardId) {
  return (dispatch, getState) => {
    const card = getState().cards.get('cards').get('entities').get(cardId);

    api.updateCard(cardId, card.get('quantity') - 1).then(resp => {
      dispatch(decrementQuantityLocal(cardId));
    });
  };
}

export function setCardNameFilter(name) {
  return {
    type: 'SET_CARD_NAME_FILTER',
    payload: {
      name
    }
  }
}

export function addCardSetFilter(cardSetId) {
  return {
    type: 'ADD_CARD_SET_FILTER',
    payload: {
      cardSetId
    }
  }
}

export function removeCardSetFilter(cardSetId) {
  return {
    type: 'REMOVE_CARD_SET_FILTER',
    payload: {
      cardSetId
    }
  }
}

export function setHideOwnedCards(hideOwnedCards) {
  return {
    type: 'SET_HIDE_OWNED_CARDS',
    payload: {
      hideOwnedCards
    },
  };
}

/*
 * DECKS
 */
export function fetchDecksStarted() {
  return {
    type: 'FETCH_DECKS_STARTED'
  }
}

export function fetchDecks() {
  return dispatch => {
    dispatch(fetchDecksStarted());

    api.fetchDecks().then(resp => {
      dispatch(fetchDecksSucceeded(resp.data));
    });
  };
}

export function fetchDecksSucceeded(decks) {
  return {
    type: 'FETCH_DECKS_SUCCEEDED',
    payload: {
      decks,
    },
  };
}

export function setDeckContents(deckContents) {
  return {
    type: 'SET_DECK_CONTENTS',
    payload: {
      deckContents
    },
  };
}

export function setDeckName(name) {
  return {
    type: 'SET_DECK_NAME',
    payload: {
      name
    },
  };
}

export function saveDeckSucceeded() {
  return {
    type: 'SAVE_DECK_SUCCEEDED'
  }
}

export function saveDeck(history) {
  return (dispatch, getState) => {
    const name = getState().cards.get('deckName');
    const deckContents = getState().cards.get('deckContents');

    api.createDeck(name, deckContents).then(resp => {
      dispatch(saveDeckSucceeded());
      history.push('/decks');
    });
  };
}

export function buildDeckStarted() {
  return {
    type: 'BUILD_DECK_STARTED'
  }
}

export function buildDeck(history, id) {
  return dispatch => {
    dispatch(buildDeckStarted());

    api.buildDeck(id).then(resp => {
      dispatch(buildDeckSucceeded(resp.data));
      history.push('/orders/new');
    })
  };
}

export function buildDeckSucceeded(data) {
  return {
    type: 'BUILD_DECK_SUCCEEDED',
    payload: data
  }
}

export function setDeckNameFilter(name) {
  return {
    type: 'SET_DECK_NAME_FILTER',
    payload: {
      name
    }
  }
}

/*
 * CARD_SETS
 */
export function fetchCardSets() {
  return dispatch => {
    api.fetchCardSets().then(resp => {
      dispatch(fetchCardSetsSucceeded(resp.data));
    });
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
