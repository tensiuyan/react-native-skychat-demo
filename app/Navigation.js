import React, { Component } from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './Login';
import ConversationList from './ConversationList';
import Conversation from './Conversation';
import skygear from 'skygear/react-native';


//import UserList from './UserList';
export default RootNavigator = StackNavigator({

  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Login',
    },
  },

  Conversation: {
    path: 'people/:name',
    screen: Conversation,
    navigationOptions: ({navigation}) => ({
      headerTitle: `${navigation.state.params.item.title}`,
    }),
  },
  ConversationList: {
    screen: ConversationList,
    navigationOptions: {
      headerTitle: 'Conversations',
    },
  }
}, {
  initialRouteName: 'Login',
});
