# React Native SkyChat demo

This demo is linked with the "edwardtrial" SkyChat account. Let Ten know if you don't have the access to the account.

## Set up

1. Make sure you have installed [React Native](https://facebook.github.io/react-native/docs/getting-started.html). 
2. Then, run  `npm install`.
3. To run the app, run `react-native run-ios` or `react-native run-android`.

## Sample users

For demo purpose we have already created a few users in the app for you. Feel free to login as any one of them.

1. 'ten', '1234'
2. 'carrie', '1234'
3. 'patrick', '1234'

For details, please go to the data browser in your developer portal. (Database > [Data Browser](https://portal.skygear.io/app/edwardtrial/database/browser))

## Key API demostrated

1. **Login** - skygear.auth.loginWithUsername(username, password)
2. **Get all the conversations the current user has**: [skygearChat.getConversations()](https://docs.skygear.io/js/chat/reference/latest/class/lib/container.js~SkygearChatContainer.html#instance-method-getConversations)
3. **Get all the messages of a conversation**: [skygearChat.getMessages()](https://docs.skygear.io/js/chat/reference/latest/class/lib/container.js~SkygearChatContainer.html#instance-method-getMessages)
4. **Send text messages**: [skygearChat.createMessage()](https://docs.skygear.io/js/chat/reference/latest/class/lib/container.js~SkygearChatContainer.html#instance-method-createMessage)
5. **Listen to new messages**: [skygearChat.subscribe(handler:function)](https://docs.skygear.io/js/chat/reference/latest/class/lib/container.js~SkygearChatContainer.html#instance-method-subscribe)


## Other notes

The UI of the conversation view is built with [Gifted Chat](gifted.chat). It is an open source React Native messaging UI library.

## Learn more

- [SkyChat JS SDK documentation](https://docs.skygear.io/guides/auth/basics/js/)
- [SKyChat JS SDK API reference](https://docs.skygear.io/js/chat/reference/latest/)