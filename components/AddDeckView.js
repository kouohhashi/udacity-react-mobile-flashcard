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
import { addDeckToStorage, fetchDeckFromStorage } from '../utils/api'
import { addNewDeck } from '../actions/UserActions'

class AddDeckView extends Component {

  state = {
    titleText: '',
  }

  handleChangeText = (titleText) => {
    this.setState({
      titleText
    })
  }

  addNewDeckRequest = () => {

    // close keyboard
    Keyboard.dismiss()

    const { titleText } = this.state

    if (!titleText){
      return;
    }

    let decks = []

    fetchDeckFromStorage()
    .then((results) => {

      if (results) {
        decks = results
      }

      // check if the deck is already added
      let existFlg = decks.reduce((accumulator, deck) => {
        if (deck.key === titleText.trim()){
          return accumulator + 1
        } else {
          return accumulator;
        }
      }, 0)
      if (existFlg !== 0){
        return Promise.reject(Error('Already exist?'))
      }

    })
    .then(() => {
      // add deck

      const entry = {
        title: titleText,
        questions: []
      }

      const param = {
        key: titleText,
        entry: entry,
      }

      return addDeckToStorage(param)
    })
    .then(() => {
      // fetch decks again
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
    this.setState({titleText: ''})
  }

  render() {

    const decks = [{name: 'a'}, {name: 'b'}, {name: 'c'}]
    const { titleText } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

        <Text style={styles.text}>
          What is the title of your new deck?
        </Text>

        <TextInput
          style={styles.inputText}
          onChangeText={this.handleChangeText}
          name='titleText'
          placeholder=' New Deck'
          value={titleText}
        />

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
          onPress={this.addNewDeckRequest}>
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
    marginTop:40,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 28,
    flex: 1,
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
    marginBottom:30,
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


// function mapStateToProps ({ user }) {
//   return {
//     decks: user.decks
//   }
// }

function mapDispatchToProps (dispatch) {
  return {
    mapDispatchAddNewDeck: (data) => dispatch(addNewDeck({ params: data})),
  }
}

export default connect(
  null, mapDispatchToProps
)(AddDeckView)
