import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  Button,
  View
} from 'react-native';
import skygear from 'skygear/react-native';
import { StackNavigator } from 'react-navigation';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    skygear.auth.loginWithUsername(this.state.username, this.state.password).then((user) => {
      console.log(user); // user record
      this.props.navigation.navigate('ConversationList');
    }, (error) => {
      console.log("cannot create user", error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          onSubmitEditing={Keyboard.dismiss}
          placeholder={'Ten'}
          multiline={false}
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          onSubmitEditing={Keyboard.dismiss}
          placeholder={'1234'}
          multiline={false}
        />
        <Button
          onPress={this.login}
          title="Login Now"
          color="#007bd4"
        />
        <Text>Please login with "Ten", "!234"</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 250,
    color: '#555555',
    padding: 10,
    height: 50,
    borderColor: '#007bd4',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    marginBottom: '5%',
  },
});
