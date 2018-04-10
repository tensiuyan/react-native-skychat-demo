import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  List,
  TouchableHighlight,
  View,
} from 'react-native';
import skygear from 'skygear/react-native';
import skygearChat from 'skygear-chat';
import { StackNavigator } from 'react-navigation';


export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    console.log("I am here");
  }

  componentDidMount() {
    this.getConversationList();
    this.subscribe();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  // subscribe() {
  //   skygearChat.subscribe((msgData) => {
  //     if (msgData.record.conversation.id === currentId) {
  //       console.log(msgData)
  //       this.setState((previousState) => {
  //         return {
  //           messages: append([{
  //             _id: msgData.record.id,
  //             text: msgData.record.body,
  //             createdAt: msgData.record._createdAt,
  //             user: {
  //               _id: msgData.record.ownerID,
  //               // avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //             },
  //           }],previousState.messages),
  //         };
  //       });
  //     }
  //   })
  // }


  //this is only for demo purposes. avoid calling an aysnc function and setting state in componentDidMount
  getConversationList() {
    skygearChat.getConversations().then((conversations) => {
      console.log(conversations);
      if (!this.unmounted) {
        this.setState({
          data: conversations,
        });
      }
    });
  };

  subscribe() {
    skygearChat.subscribe((msgData) => {
      this.getConversationList();
    })
  };

  renderSeparator () {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderItem = ({ item }) => {
    const navigate = this.props.navigation.navigate;
    return (
      <TouchableHighlight onPress={() => navigate('Conversation', {item})}>
        <View>
          <Text style={styles.flatlist}>{item.title}</Text>
          <Text style={styles.lastMessage}>{item.last_message.body}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }

  _keyExtractor = (item) => {
    return item.id;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  flatlist: {
    fontSize: 16,
    marginLeft:"5%",
    marginTop:"5%",
    marginBottom: "1%",
  },
  lastMessage: {
    fontSize: 12,
    marginLeft:"5%",
    marginTop:"1%",
    marginBottom: "5%",
  }
});
