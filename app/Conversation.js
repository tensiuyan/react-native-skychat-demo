import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  List,
  View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import skygearChat from 'skygear-chat';
import skygear from 'skygear';

function append(arr1, arr2) {
  console.log('louis#append', arr1,arr2);
  const output = [];
  const map = {};
  for (const a of arr1) {
    map[a._id] = a;
    output.push(a._id);
  }
  for (const b of arr2) {
    if (!map[b._id]) {
      output.push(b._id);
    }
    map[b._id] = b;
  }

  console.log('louis#output', output);
  const ret = output.map((id) => map[id]);
  console.log('louis#yiu',ret);
  return ret;
}

export default class Conversation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.getMessages();
    this.subscribe();
  }

  getMessages () {
    const params = this.props.navigation.state.params;
    const conversation = params.item;

    skygearChat.getMessages(conversation).then((messages) => {
      this.setState ({
        messages: messages.map((message) => ({
          _id: message.id,
          text: message.body,
          createdAt: message._createdAt,
          user: {
            _id: message.ownerID,
          }
        }))
      })
    });
  };

  onSend(messages = []) {

    console.log(messages);
    const params = this.props.navigation.state.params;
    const conversation = params.item;

    const skyMessage = messages[0].text;

    skygearChat.createMessage(conversation, skyMessage, null, null).then((result) => {
      console.log('Message sent!', result);
      this.setState((previousState) => ({
        messages: append([{
          _id: result.id,
          text: result.body,
          createdAt: result._createdAt,
          user: {
            _id: result.ownerID,
          }
        }],previousState.messages),
      }));
    })
  }

  subscribe() {
    const params = this.props.navigation.state.params;
    const conversation = params.item;

    const currentId = conversation.id;

    skygearChat.subscribe((msgData) => {
      if (msgData.record.conversation.id === currentId) {
        console.log(msgData)
        this.setState((previousState) => {
          return {
            messages: append([{
              _id: msgData.record.id,
              text: msgData.record.body,
              createdAt: msgData.record._createdAt,
              user: {
                _id: msgData.record.ownerID,
                // avatar: 'https://facebook.github.io/react/img/logo_og.png',
              },
            }],previousState.messages),
          };
        });
      }
    })
  }

  render() {
    const userID = skygear.auth.currentUser._id;
    console.log(userID);
    return (
      <GiftedChat
        style= {{backgroundColor: '#ffffff'}}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: userID,
        }}
      />
    );
  }

}
