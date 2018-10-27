import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

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
