import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/homeStyles';
import { RootStackParamList } from '../navigation/navigation'; 

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require('../assets/HomePage.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.subtitle}>Get it done, move on</Text>
        <Text style={styles.title}>MyTasko</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
