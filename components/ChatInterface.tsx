// ChatInterface.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';

import Header from './Header';
import MessageList from './MessageList';
import InputContainer from './InputContainer';

import { Message } from '../types/message';
import { initialMessages } from '../types/initMessages';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<Message>>(initialMessages);

  const handleSend = () => {
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length.toString(), text: input, type: 'sent' }]);
    setInput('');
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e.value);
    setInput(e.value ? e.value[0] : '');
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(() => {
        Voice.removeAllListeners();
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header title="VoiceChatGPT++" />
      <MessageList messages={messages} />
      <InputContainer input={input} setInput={setInput} handleSend={handleSend} startListening={startListening} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default ChatInterface;
