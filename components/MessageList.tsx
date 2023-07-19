// MessageList.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Message from './Message'; // Import the Message component
import { Message as MessageType } from '../types/message'; // Import the Message type

type MessageListProps = {
  messages: MessageType[];
};

const styles = StyleSheet.create({
  messageList: {
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#444654',
    width: '100%',
  },
});

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <FlatList
    data={messages}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <Message message={item} />} // The type is now retrieved from the item
    contentContainerStyle={styles.messageList}
  />
);

export default MessageList;
