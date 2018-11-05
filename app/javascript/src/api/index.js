import axios from 'axios';

const API_BASE_URL = '/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function fetchCardSets() {
  return client.get('/card_sets');
}

export function fetchCards() {
  return client.get('/cards');
}

export function updateCard(cardId, quantity) {
  return client.patch(`/cards/${cardId}`, {quantity: quantity});
}

export function createDeck(name, deckContents) {
  return client.post('/decks', {name, deckContents});
}

export function fetchDecks() {
  return client.get('/decks');
}

export function buildDeck(id) {
  return client.get(`/decks/${id}/build`)
}
