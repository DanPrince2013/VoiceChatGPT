// Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const Header: React.FC<HeaderProps> = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

export default Header;
