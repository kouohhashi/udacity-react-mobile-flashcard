export const LOAD_SAVED_DECKS = 'LOAD_SAVED_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'

export function loadSavedDecks ({ params }) {

  return {
    type: LOAD_SAVED_DECKS,
    params
  }
}

export function addNewDeck ({ params }) {

  return {
    type: ADD_NEW_DECK,
    params
  }
}
