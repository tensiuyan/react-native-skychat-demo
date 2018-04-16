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
      <TouchableHighlight
        onPress={() => navigate('Conversation', {item})} >
        <View style={styles.flatlist}>
          <Text style={styles.conversationTitle}>{item.title}</Text>
          <View style={styles.lastAUnread}>
            <Text style={styles.lastMessage}>{item.last_message.body}</Text>
            <Text style={styles.unreadCount}>{item.unread_count}</Text>
          </View>
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
    padding: 10,
    flexDirection: 'column',
    margin: 20,
  },
  conversationTitle: {
    fontSize: 18,
  },
  lastAUnread:{
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lastMessage: {
    fontSize: 15,
  },
  unreadCount: {
    fontSize: 15,
  }
});
