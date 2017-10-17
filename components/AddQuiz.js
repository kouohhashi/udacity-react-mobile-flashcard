import React, { Component } from 'react'
import { View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { white, darkBrown } from '../utils/colors'
import { updateDeckOnStorage, fetchDeckFromStorage } from '../utils/api'
import { addNewDeck } from '../actions/UserActions'

class AddQuiz extends Component {

  state = {
    question: '',
    answer: '',
  }

  handleChangeQuestion = (question) => {
    this.setState({
      question
    })
  }

  handleChangeAnswer = (answer) => {
    this.setState({
      answer
    })
  }

  addNewQuizRequest = () => {

    Keyboard.dismiss()

    const { question, answer } = this.state
    const { navigation } = this.props
    const { title, questions } = navigation.state.params

    if (!question || !answer){
      return;
    }

    let decks = []

    fetchDeckFromStorage()
    .then((results) => {

      if (!results){
        return Promise(Error('no such deck'))
      }
      decks = results

      let edittingDeck = decks.filter((deck) =>{
        if (deck.key === title){
          return true
        } else {
          return false
        }
      })

      if (!edittingDeck || edittingDeck.length === 0){
        return Promise(Error('no such deck'))
      }

      return Promise.resolve(edittingDeck[0])
    })
    .then((results) => {
      // check if question is already exist?

      let existFlg = results.entry.questions.reduce((accumulator, item) => {
        if (item.question === question.trim()){
          return accumulator + 1
        } else {
          return accumulator;
        }
      }, 0)
      if (existFlg !== 0){
        return Promise.reject(Error('Question already exist?'))
      }

      // add card
      let updatedDeck = decks.map((item) => {
        if ( item.key === title ){
          const qa = {
            question: question.trim(),
            answer: answer.trim(),
          }
          item.entry.questions.push(qa)
        }
        return item
      })

      return Promise.resolve(updatedDeck)
    })
    .then((results) => {
      // add deck

      return updateDeckOnStorage(results)
    })
    .then(() => {
      return fetchDeckFromStorage()
    })
    .then((results) => {
      // update props
      decks = results
      this.props.mapDispatchAddNewDeck(decks)
    })
    .then(() => {
      // show success alert

      Alert.alert(
        'Success!',
        'You created a new deck successfully.',
        [
          {text: 'Close', onPress: () => this.resetCurrentText()},
        ],
        { cancelable: false }
      )

    })
    .catch((err) => {
      console.log("fetchDeckFromStorage err:", err)

      Alert.alert(
        'Error!',
        err.message,
        [
          {text: 'Close', onPress: () => console.log('Closeed')},
        ],
        { cancelable: false }
      )
    })
  }

  resetCurrentText = () => {

    this.setState({
      question: '',
      answer: '',
    }, (aa, bb) => {
      console.log("aasdf:", aa, bb)
    })
  }

  render() {

    const decks = [{name: 'a'}, {name: 'b'}, {name: 'c'}]
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>
            Add your card
          </Text>

          <Text style={[styles.text, {fontSize: 18}]}>
            Please add your question and answer here.
          </Text>
        </View>


        <TextInput
          style={[styles.inputText, {
            marginBottom: 10,
          }]}
          onChangeText={this.handleChangeQuestion}
          name='question'
          placeholder=' Question'
          value={question}
        />

        <TextInput
          style={styles.inputText}
          onChangeText={this.handleChangeAnswer}
          name='Answer'
          placeholder=' Answer'
          value={answer}
        />

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={this.addNewQuizRequest}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  text: {
    marginLeft: 40,
    marginRight: 40,
    fontSize: 28,
  },
  inputText:{
    marginLeft: 40,
    marginRight: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
  },
  iosSubmitBtn: {
    backgroundColor: darkBrown,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:10,
    marginBottom:90,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchAddNewDeck: (data) => dispatch(addNewDeck({ params: data})),
  }
}

export default connect(
  null, mapDispatchToProps
)(AddQuiz)
