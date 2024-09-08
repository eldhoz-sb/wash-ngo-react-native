import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash1.png')} style={styles.splashImage1} />
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.text}>Welcome to MyApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  splashImage1: {
    width:"60%",
    resizeMode:"contain",
    position:"absolute",
    top:0,
    right:0,
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
