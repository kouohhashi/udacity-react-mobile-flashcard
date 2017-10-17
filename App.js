import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { white, darkBrown } from './utils/colors'
import { Ionicons } from '@expo/vector-icons'

// components
import DeckListView from './components/DeckListView'
import AddDeckView from './components/AddDeckView'
import DeckCard from './components/DeckCard'
import AddQuiz from './components/AddQuiz'
import PracticeView from './components/PracticeView'
import { setLocalNotification } from './utils/helpers'

// status bar
function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// tab navigator
const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'YOUR DECKS',
      tabBarIcon: ({ tintColor }) => <Ionicons name='md-list-box' size={30} color={tintColor} />
    },
  },
  AddDeckView: {
    screen: AddDeckView,
    navigationOptions: {
      tabBarLabel: 'ADD DECK',
      tabBarIcon: ({ tintColor }) => <Ionicons name='md-add-circle' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? darkBrown : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : darkBrown,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

// for some reason purple was not working...

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerBackTitle: 'Back to List',
      headerTitleStyle: {
        color: white,
      },
      headerStyle: {
        backgroundColor: darkBrown,
      },
      headerTintColor: {
        headerTintColor: white,
      },
    }
  },
  DeckCard: {
    screen: DeckCard,
    navigationOptions: {
      headerBackTitle: 'Back to Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBrown,
      }
    }
  },
  AddQuiz: {
    screen: AddQuiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBrown,
      }
    }
  },
  PracticeView: {
    screen: PracticeView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBrown,
      }
    }
  }
})

// <Tabs />
export default class App extends React.Component {

  DidComponentMount () {
    console.log("APP DidComponentMount")
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>

          <UdaciStatusBar backgroundColor={darkBrown} barStyle="light-content" />

          <MainNavigator />

        </View>
      </Provider>
    );
  }
}
