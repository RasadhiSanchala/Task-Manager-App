import React, { useState } from 'react';
import styles from '../styles/addTaskStyles';
import { RootStackParamList } from '../types/navigation'; 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const AddTaskScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <Image source={require('../assets/toggle.png')} style={styles.toggleIcon} />
        <Text style={styles.screenTitle}>Add Task</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="About"
          value={about}
          onChangeText={setAbout}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.plusButton}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.noTasksText}>No tasks yet</Text>
    </ImageBackground>
  );
};

export default AddTaskScreen;
