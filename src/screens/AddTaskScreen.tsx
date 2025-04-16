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
import NavBar from '../components/NavBar';
import { useTasks } from '../store/TaskContext'; // ✅ shared task context

const AddTaskScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [showNav, setShowNav] = useState(false);

  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTasks(); // ✅ use context

  const handleAddTask = () => {
    if (title.trim() === '' || about.trim() === '') return;

    addTask({
      title: title.trim(),
      about: about.trim(),
    });

    setTitle('');
    setAbout('');
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          {/* 🔼 Nav toggle */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowNav(!showNav)}>
              <Image source={require('../assets/toggle.png')} style={styles.toggleIcon} />
            </TouchableOpacity>
          </View>

          <NavBar visible={showNav} onClose={() => setShowNav(false)} />

          {/* 🔽 Input */}
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

          {/* 🔽 Task List */}
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
                  <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
                    <Text style={{ fontSize: 20 }}>{task.completed ? '☑️' : '⬜'}</Text>
                  </TouchableOpacity>

                  <View style={styles.taskTextBox}>
                    <Text
                      style={[styles.taskTitle, task.completed && styles.completedText]}
                    >
                      {task.title}
                    </Text>
                    <Text
                      style={[styles.taskAbout, task.completed && styles.completedText]}
                    >
                      {task.about}
                    </Text>
                  </View>

                  <TouchableOpacity onPress={() => deleteTask(task.id)}>
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
