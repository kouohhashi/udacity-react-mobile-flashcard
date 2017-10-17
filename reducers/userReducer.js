import {
  LOAD_SAVED_DECKS,
  ADD_NEW_DECK,
} from '../actions/UserActions'

function user (state = {}, action) {

  const { params } = action

  switch (action.type) {

    case LOAD_SAVED_DECKS :

      // const { params } = action
      return {
        ...state,
        decks: params,
      }

    case ADD_NEW_DECK :

      // const { params } = action
      return {
        ...state,
        decks: params,
      }

    default :
      return state
  }
}

export default user
