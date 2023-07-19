// InputContainer.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type InputContainerProps = {
    input: string;
    setInput: (text: string) => void;
    handleSend: () => void;
    startListening: () => void;
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        bottom: 0,
        alignContent: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginRight: 10,
        margin: 3,
        backgroundColor: '#fff',
    },
    mic: {
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10,
    },
    send: {
        marginTop: 13,
        paddingRight: 10,
    },
});

const InputContainer: React.FC<InputContainerProps> = ({ input, setInput, handleSend, startListening }) => {
    const handleTextChange = (text: string) => {
      setInput(text);
    };
  
    const handleSendPress = () => {
      if (input.trim() !== '') {
        handleSend();
      }
    };
  
    const handleKeyPress = (event: any) => {
      if (event.nativeEvent.key === 'Enter') {
        handleSendPress();
      }
    };
  
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.mic} onPress={startListening}>
          <Icon name="microphone" size={40} color="#090" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={handleTextChange} // Call handleTextChange when the text input changes
          placeholder="Type your message..."
          onSubmitEditing={handleSendPress} // Call handleSendPress when the send button is pressed
          returnKeyType="send"
          onKeyPress={handleKeyPress} // Call handleKeyPress when a key is pressed
        />
        <TouchableOpacity style={styles.send} onPress={handleSendPress}>
          <Icon name="paper-plane" size={30} color="#090" />
        </TouchableOpacity>
      </View>
    );
  };
  

export default InputContainer;
