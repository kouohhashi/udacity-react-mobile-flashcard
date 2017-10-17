import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchDeckFromStorage, removeAllDeckFromStorage } from '../utils/api'
import { loadSavedDecks } from '../actions/UserActions'
import { darkBrown, white } from '../utils/colors'

class DeckCard extends Component {

  addNewQuiz = () => {

    const { navigation } = this.props
    const { title } = navigation.state.params

    navigation.navigate(
      'AddQuiz',
      { title: title },
    )
  }

  startQuiz = () => {

    const { navigation } = this.props
    const { title } = navigation.state.params

    navigation.navigate(
      'PracticeView',
      { title: title },
    )
  }

  render() {

    const { navigation, decks } = this.props
    const { title } = navigation.state.params
    const deck = decks.filter((item) => item.key === title)[0]
    const questions = deck.entry.questions

    return (
      <View style={styles.container}>

        <View style={{
            flexDirection:'row',
            justifyContent:'center',
          }}>

          <Text style={{
              color: '#000000',
              fontSize: 28,
            }}>
            {title}
          </Text>

        </View>

        <View style={{
            flexDirection:'row',
            justifyContent:'center',
          }}>
          <Text style={{
              color: '#cccccc',
              fontSize: 18,
            }}>
            {questions.length} {questions.length === 0 ? 'card' : 'cards'}
          </Text>
        </View>


        <View style={{
            flex:1,
            flexDirection:'column',
            justifyContent:'flex-end',
          }}>

          <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {
              backgroundColor: white,
              borderColor: darkBrown,
              borderWidth: 1,
            }]}
            onPress={this.addNewQuiz}>
              <Text style={[styles.submitBtnText, {
                  color: darkBrown,
                }]}>Add Quiz</Text>
          </TouchableOpacity>

          {questions && questions.length !== 0 && (
            <TouchableOpacity
              style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {
                marginBottom: 30,
              }]}
              onPress={this.startQuiz}>
                <Text style={styles.submitBtnText}>Start Quiz</Text>
            </TouchableOpacity>
          )}

        </View>

      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosSubmitBtn: {
    backgroundColor: darkBrown,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:10,
    marginBottom:10,
  },
  AndroidSubmitBtn: {
    backgroundColor: darkBrown,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})


function mapStateToProps ({ user }) {
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
)(DeckCard)
