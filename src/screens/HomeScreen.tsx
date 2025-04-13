import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../styles/homeStyles';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/HomePage.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.subtitle}>Get it done, move on</Text>
        <Text style={styles.title}>MyTasko</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
