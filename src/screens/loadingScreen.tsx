import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import styles from '../styles/loadingStyles';

const LoadingScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/LoadingPage.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;
