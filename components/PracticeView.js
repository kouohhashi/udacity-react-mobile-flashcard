import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchDeckFromStorage, removeAllDeckFromStorage } from '../utils/api'
import { loadSavedDecks } from '../actions/UserActions'
import { white, darkBrown } from '../utils/colors'
import PracticeEnd from './PracticeEnd'
import { Ionicons } from '@expo/vector-icons'

class PracticeView extends Component {

  state = {
    quizIndex: 0,
    showAnswerFlg: false,
    correctCount: 0,
    incorrectCount: 0,
  }

  toggleAnswer = () => {
    this.setState({
      showAnswerFlg: this.state.showAnswerFlg ? false : true
    })
  }

  submitCorrect = () => {
    this.setState( (state) => ({
      correctCount: state.correctCount + 1,
      quizIndex: state.quizIndex + 1,
      showAnswerFlg: false,
    }) )
  }

  submitIncorrect = () => {

    this.setState( (state) => ({
      incorrectCount: state.incorrectCount + 1,
      quizIndex: state.quizIndex + 1,
      showAnswerFlg: false,
    }) )

  }

  render() {

    const { quizIndex, showAnswerFlg, correctCount, incorrectCount } = this.state
    const { navigation, decks } = this.props
    const { title } = navigation.state.params
    const deck = decks.filter((item) => item.key === title)[0]
    const questions = deck.entry.questions

    if (questions.length == quizIndex ){
      return <PracticeEnd correctCount={correctCount} incorrectCount={incorrectCount} />
    }

    const question = questions[quizIndex].question
    const answer = questions[quizIndex].answer

    return (
      <View style={styles.container}>


        <Text style={{color: darkBrown, fontSize: 14,}}>
          {quizIndex + 1} / { questions.length }
        </Text>


        <View style={{
            flexDirection:'row',
            justifyContent:'center',
          }}>

          {showAnswerFlg ? (
            <Text style={{color: 'orange', fontSize: 28}}>{answer}</Text>
          ) : (
            <Text style={{color: '#000000', fontSize: 28}}>{question}</Text>
          )}

        </View>


        <TouchableOpacity
          style={{
            flex:1,
            flexDirection: 'row',
            justifyContent:'center',
          }}
          onPress={this.toggleAnswer}>

          <Ionicons name='ios-eye' size={30} color={darkBrown} />
          <Text style={{
              color: darkBrown,
              marginTop: 6,
              marginLeft: 2,
            }}>
            {showAnswerFlg ? 'show question' : 'show answer'}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={this.submitCorrect}>
            <Text style={styles.submitBtnText}>Correct!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Platform.OS === 'ios' ? styles.iosSubmitBtnIncorrect : styles.AndroidSubmitBtnIncorrect, {
            marginBottom: 30
          }]}
          onPress={this.submitIncorrect}>
            <Text style={styles.submitBtnText}>Incorrect</Text>
        </TouchableOpacity>

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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:10,
    marginBottom:10,
  },
  AndroidSubmitBtn: {
    backgroundColor: 'green',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosSubmitBtnIncorrect: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:10,
    marginBottom:10,
  },
  AndroidSubmitBtnIncorrect: {
    backgroundColor: 'orange',
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
)(PracticeView)
