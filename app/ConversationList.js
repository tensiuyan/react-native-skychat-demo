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
    this.getConversationList()
  }

  getConversationList () {
    skygearChat.getConversations().then((conversations) => {
      //console.log('Fetched ' + conversations.length.toString() + 'conversations.');
      this.setState({
        data: conversations,
      })
  })
    // const User = skygear.Record.extend('user');
    // const query = new skygear.Query(User);
    // query.limit = 10000;
    // console.log("wei");
    // skygear.publicDB.query(query).then((users) => {
    //   console.log(users);
    //   this.setState({
    //     data: users,
    //   })
    // }, (error) => {
    //   console.error(error);
    // });
  }

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

  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) =>
            <TouchableHighlight onPress={() => navigate('Conversation', {item})}>
                  <Text style={styles.flatlist}>{item.title}</Text>
            </TouchableHighlight>
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
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
    marginBottom: "5%",
  }
});
