import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from '../styles/addTaskStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Task = {
  id: number;
  title: string;
  about: string;
  completed: boolean;
};

const AddTaskScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleAddTask = () => {
    if (title.trim() === '' || about.trim() === '') return;

    const newTask: Task = {
      id: nextId,
      title: title.trim(),
      about: about.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
    setTitle('');
    setAbout('');
  };

  const handleToggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Image source={require('../assets/toggle.png')} style={styles.toggleIcon} />
          </View>
  
          <View style={styles.inputRow}>
            <View style={styles.inputsColumn}>
              <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholderTextColor="#A66CFF"
              />
              <TextInput
                placeholder="About"
                value={about}
                onChangeText={setAbout}
                style={styles.input}
                placeholderTextColor="#A66CFF"
              />
            </View>
  
            <TouchableOpacity style={styles.plusButton} onPress={handleAddTask}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
  
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            {tasks.length === 0 ? (
              <Text style={styles.noTasksText}>No tasks yet</Text>
            ) : (
              tasks.map(task => (
                <View key={task.id} style={styles.taskBox}>
                  <TouchableOpacity onPress={() => handleToggleComplete(task.id)}>
                    <Text style={{ fontSize: 20 }}>
                      {task.completed ? '☑️' : '⬜'}
                    </Text>
                  </TouchableOpacity>
  
                  <View style={styles.taskTextBox}>
                    <Text
                      style={[
                        styles.taskTitle,
                        task.completed && styles.completedText,
                      ]}
                    >
                      {task.title}
                    </Text>
                    <Text
                      style={[
                        styles.taskAbout,
                        task.completed && styles.completedText,
                      ]}
                    >
                      {task.about}
                    </Text>
                  </View>
  
                  <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
  
};

export default AddTaskScreen;
