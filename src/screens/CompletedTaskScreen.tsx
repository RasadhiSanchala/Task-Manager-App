import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/completedStyles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar';
import { NavigationProp } from '@react-navigation/native';



interface Task {
  id: string;
  title: string;
  about: string;
  completed: boolean;
}

type CompletedTaskScreenProps = {
  navigation: NavigationProp<any>; 
};

const CompletedTaskScreen = ({ navigation }: CompletedTaskScreenProps) => {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      console.log('Loading tasks...');
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks: Task[] = JSON.parse(storedTasks);
          const filtered = parsedTasks.filter((task) => task.completed);
          setTasks(filtered);
        }
      } catch (e) {
        console.error('Failed to load tasks:', e);
      }
    };
  
    const unsubscribe = navigation.addListener('focus', loadTasks);
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowNav(!showNav)}>
            <Text style={styles.toggleIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        <NavBar visible={showNav} onClose={() => setShowNav(false)} />

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
          {tasks.length === 0 ? (
            <Text style={styles.noTasksText}>No completed tasks</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskBox}>
                <Text style={{ fontSize: 20 }}>☑️</Text>
                <View style={styles.taskTextBox}>
                  <Text style={[styles.taskTitle, styles.completedText]}>
                    {task.title}
                  </Text>
                  <Text style={[styles.taskAbout, styles.completedText]}>
                    {task.about}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default CompletedTaskScreen;
