import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchDeckFromStorage, removeAllDeckFromStorage } from '../utils/api'
import { loadSavedDecks } from '../actions/UserActions'
import DeckListViewItem from './DeckListViewItem'
import { darkBrown, white } from '../utils/colors'

class DeckListView extends Component {

  componentDidMount() {

    // retrieve data from local storage to redux
    fetchDeckFromStorage()
    .then((results) => {
      this.props.mapDispatchLoadSavedDecks(results)
    })
    .then(() => {
      console.log("loading... OK")
    })
    .catch((err) => {
      console.log("fetchDeckFromStorage, err:", err)
    })
  }

  renderItem = ({ item }) => {

    const { navigation } = this.props
    const { entry } = item

    return <DeckListViewItem navigation={navigation} {...entry} />
  }

  render() {

    const { decks } = this.props

    return (
      <View style={{flex: 1}}>

        <View style={{
            height: 70,
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 0
            }
        }}>
          <Text style={{
              margin:15,
              fontSize:20,
              color: darkBrown,
            }}>
            Your flash card app
          </Text>
        </View>

        { decks && decks.length !== 0 ? (
          <FlatList
            style={{flex: 1}}
            data={decks}
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
          />
        ) : (
          <Text style={{
              margin: 20
            }}>
            You don't have a deck yet. Please add a new deck.
          </Text>
        )}

      </View>
    )
  }
}

function mapStateToProps ({ user }) {

  // console.log("mapStateToProps:", user)

  return {
    decks: user.decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchLoadSavedDecks: (data) => dispatch(loadSavedDecks({ params: data})),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(DeckListView)
