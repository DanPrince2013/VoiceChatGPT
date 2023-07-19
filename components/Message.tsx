// Message.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Message as MessageType } from '../types/message';

type MessageProps = {
  message: MessageType
};

const styles = StyleSheet.create({
  sentMessageContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: "#555"
  },
  sentMessageText: {
    color: 'white',
  },
  receivedMessageContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: '#888',
  },
  receivedMessageText: {
    color: 'white',
  },
  messageImage: {
    width: 30,
    height: 30,
    marginRight: 10, // Add some space between the image and the text
  },
});

const Message: React.FC<MessageProps> = ({ message }) => (
  <View style={[message.type === 'sent' ? styles.sentMessageContainer : styles.receivedMessageContainer]}>
    <Image 
      source={message.type === 'received' ? require('../assets/chatGPTIcon.png') : require('../assets/person.png')} 
      style={styles.messageImage} 
    />
    <Text style={[message.type === 'sent' ? styles.sentMessageText : styles.receivedMessageText]}>{message.text}</Text>
  </View>
);

export default Message;
