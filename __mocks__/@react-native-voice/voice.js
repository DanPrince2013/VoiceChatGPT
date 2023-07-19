export default {
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
    destroy: jest.fn(),
    removeAllListeners: jest.fn(),
    onSpeechStart: jest.fn(),
    onSpeechRecognized: jest.fn(),
    onSpeechEnd: jest.fn(),
    onSpeechError: jest.fn(),
    onSpeechResults: jest.fn(),
    onSpeechPartialResults: jest.fn(),
    onSpeechVolumeChanged: jest.fn(),
  };
  