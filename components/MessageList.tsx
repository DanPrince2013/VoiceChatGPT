import React, { useEffect, useRef } from 'react';
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

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to the end of the list whenever messages are updated
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Message key={item.id} message={item} />}
      contentContainerStyle={styles.messageList}
    />
  );
};

export default MessageList;
