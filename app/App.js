import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import skygear from 'skygear/react-native';
import RootNavigator from './Navigation';
import { StackNavigator } from 'react-navigation';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false,
    }
  }

  componentDidMount() {
    skygear.config({
      'endPoint': 'https://awesometenten.skygeario.com/', // trailing slash is required
      'apiKey': '19f6c34425d94c7785639415eb96a40f',
    }).then(() => {
      console.log('skygear is ready to make API call');
    });
  }

  render() {
      return <RootNavigator />;
  }
}
