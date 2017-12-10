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
      'endPoint': 'https://edwardtrial.skygeario.com/', // trailing slash is required
      'apiKey': '2725a1b6dea34c5e95ae78904ea6668e',
    }).then(() => {
      console.log('skygear is ready to make API call');
    });
  }

  render() {
      return <RootNavigator />;
  }
}
