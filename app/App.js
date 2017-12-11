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
      'endPoint': 'https://chatdemoapp.skygeario.com/', // trailing slash is required
      'apiKey': 'c0d796f60a9649d78ade26e65c460459',
    }).then(() => {
      console.log('skygear is ready to make API call');
    });
  }

  render() {
      return <RootNavigator />;
  }
}
