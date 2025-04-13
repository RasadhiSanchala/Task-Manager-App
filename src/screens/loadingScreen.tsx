import React, { useEffect } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/loadingStyles';
import { RootStackParamList } from '../types/navigation';

const LoadingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();//Hey TypeScript, I’m using a stack navigator with these screen. Guide me with autocomplete & catch my mistakes.

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/LoadingPage.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;
