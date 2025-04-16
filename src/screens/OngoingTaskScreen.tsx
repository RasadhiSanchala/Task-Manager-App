import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/ongoingStyles'; // reuse styling
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native'; // ✅ Added

// ✅ Defined Task type
type Task = {
  id: string;
  title: string;
  about: string;
  completed: boolean;
};

const OngoingTaskScreen = () => {
  const navigation = useNavigation(); // ✅ Added
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          const filtered = parsedTasks.filter((task: Task) => !task.completed);
          setTasks(filtered);
        }
      } catch (e) {
        console.error('Failed to load tasks:', e);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadTasks); // ✅ Now valid
    return unsubscribe;
  }, [navigation]); // ✅ Added dependency

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <View style={{ flex: 1 }}>
        {/* Toggle nav */}
        <View style={styles.header}> {/* ✅ Now exists */}
          <TouchableOpacity onPress={() => setShowNav(!showNav)}>
            <Text style={styles.toggleIcon}>☰</Text> {/* ✅ Now exists */}
          </TouchableOpacity>
        </View>

        <NavBar visible={showNav} onClose={() => setShowNav(false)} />

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
          {tasks.length === 0 ? (
            <Text style={styles.noTasksText}>No ongoing tasks</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskBox}>
                <Text style={{ fontSize: 20 }}>⬜</Text>
                <View style={styles.taskTextBox}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskAbout}>{task.about}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default OngoingTaskScreen;
