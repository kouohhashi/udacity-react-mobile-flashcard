import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchDeckFromStorage, removeAllDeckFromStorage } from '../utils/api'
import { loadSavedDecks } from '../actions/UserActions'
import { purple, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'


class PracticeEnd extends Component {

  componentDidMount(){

    // Clear local notification and set new LocalNotifications
    clearLocalNotification()
    .then(setLocalNotification)
  }

  render() {

    const {correctCount, incorrectCount} = this.props

    return (
      <View style={styles.container}>

        <View style={{
            flexDirection:'row',
            justifyContent:'center',
          }}>
          <Text style={{
              marginTop: 30,
              color: '#454545',
              fontSize: 28,
            }}>
            Completed
          </Text>
        </View>

        <View style={{
            marginTop:15,
            flexDirection:'row',
            justifyContent:'center',
          }}>
          <Text style={{color: '#454545', fontSize: 28,}}>
            Correct: {correctCount}
          </Text>
        </View>

        <View style={{
            flexDirection:'row',
            justifyContent:'center',
          }}>
          <Text style={{color: '#454545', fontSize: 28,}}>
            Incorrect: {incorrectCount}
          </Text>
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
})

export default PracticeEnd
