import { AsyncStorage } from 'react-native'

const MY_UDACICARDS_APP = 'MY_UDACICARDS_APP'


// fetech decks
export function fetchDeckFromStorage () {
  return AsyncStorage.getItem(MY_UDACICARDS_APP)
  .then((results) => {
    return JSON.parse(results)
  })
}

// add deck
export function addDeckToStorage (deck) {

  return fetchDeckFromStorage()
  .then((results) => {
    let decks = []
    if (results !== null){
      decks = results
    }
    decks.push(deck)
    console.log("addDeckToStorage -- 1")
    return AsyncStorage.setItem(MY_UDACICARDS_APP, JSON.stringify(decks))
  })
}


// update deck
export function updateDeckOnStorage (decks) {
  return AsyncStorage.setItem(MY_UDACICARDS_APP, JSON.stringify(decks))
}


export function removeAllDeckFromStorage () {
  return AsyncStorage.removeItem(MY_UDACICARDS_APP)
  // return AsyncStorage.setItem(MY_UDACICARDS_APP, null)
  // return AsyncStorage.removeItem(MY_UDACICARDS_APP)
}


// // add deck
// export function addDeckToStorage ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }
