import React, { Component } from 'react'
import { View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import { fetchDeckFromStorage, removeAllDeckFromStorage } from '../utils/api'
import { loadSavedDecks } from '../actions/UserActions'

class DeckListViewItem extends Component {

  cardPressed = () => {

    const { navigation, title, questions } = this.props

    navigation.navigate(
      'DeckCard',
      {title: title},
    )
  }

  render() {

    const { title, questions } = this.props

    return (
      <TouchableOpacity
        onPress={() => {this.cardPressed()}}
        style={{
          flex:1,
          height: 120,
          backgroundColor: 'white',
          borderColor: '#cccccc',
          borderWidth: 1,
          alignItems: 'center'
        }}>
        <View style={{justifyContent: 'flex-end', flex:1}}>
          <Text style={{
            color: '#000000',
            fontSize: 28,
          }}>
            {title}
          </Text>
        </View>

        <Text style={{
          flex:1,
          color: 'gray',
          fontSize: 18,
        }}>
          {questions.length} {questions.length === 0 ? 'card' : 'cards'}
        </Text>
      </TouchableOpacity>
    )
  }
}
//
// function mapStateToProps ({ user }) {
//
//   // console.log("mapStateToProps:", user)
//
//   return {
//     decks: user.decks
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     mapDispatchLoadSavedDecks: (data) => dispatch(loadSavedDecks({ params: data})),
//   }
// }

export default DeckListViewItem
//
// export default connect(
//   mapStateToProps, mapDispatchToProps
// )(DeckItem)
