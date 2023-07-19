// ChatInterface.tsx
import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';

import Header from './Header';
import MessageList from './MessageList';
import InputContainer from './InputContainer';

import { Message } from '../types/message';
import { initialMessages } from '../types/initMessages';
import config from '../config';
import axios, { AxiosError } from 'axios';

//import AsyncStorage from '@react-native-async-storage/async-storage';


const ChatInterface = () => {
  const apiKey: string = config.apiKey;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<Message>>(initialMessages);
  console.log(messages);

  // Function to send user input to the OpenAI API
  const sendMessage = async (input: string) => {
    try {
      // Make a POST request to the OpenAI API
      // What is a good name for a black and white cat with blue eyes that likes to scare people and then laugh?
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user', content: input 
          }],
          max_tokens: 100,
          temperature: 0.3,
          n: 1,
          stop: [],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log('OpenAI API Response:', response.data);

      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0 &&
        response.data.choices[0].message &&
        response.data.choices[0].message.content !== undefined
      ) {
        const generatedMessage = response.data.choices[0].message.content.trim();
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: response.data.id, text: generatedMessage, type: 'received' },
        ]);
      } else {
        console.error('Invalid response from OpenAI API');
      }

    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error sending message:', error);
      console.error('Error sending message:', axiosError.response);
      console.error('Error message:', axiosError.message);
      console.error('Error stack trace:', axiosError.stack);
    }
  };

  
  const handleSend = () => {
    setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length.toString(), text: input, type: 'sent' }]);
    setInput('');
    sendMessage(input);
    Keyboard.dismiss();
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
