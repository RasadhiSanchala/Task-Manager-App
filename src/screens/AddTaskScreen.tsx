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
import ConfirmDeletePopup from '../components/ConfirmDeletePopup';
import EditTaskPopup from '../components/EditTaskPopup'; 
import { useTasks } from '../store/TaskContext';

const AddTaskScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [showNav, setShowNav] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null); 

  const [editingTask, setEditingTask] = useState<null | {
    id: number;
    title: string;
    about: string;
  }>(null); 
  

  const { tasks, addTask, toggleTaskCompletion, deleteTask, editTask } = useTasks();

  const handleAddTask = () => {
    if (title.trim() === '' || about.trim() === '') return;

    addTask({
      title: title.trim(),
      about: about.trim(),
    });

    setTitle('');
    setAbout('');
  };

  const handleConfirmDelete = (taskId: number) => { 
    setSelectedTaskId(taskId);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (selectedTaskId !== null) {
      deleteTask(selectedTaskId);
    }
    setSelectedTaskId(null);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setSelectedTaskId(null);
    setShowConfirm(false);
  };

  const handleEdit = (task: { id: number; title: string; about: string }) => {
    setEditingTask(task); 
  };

  const handleSaveEdit = (updatedTitle: string, updatedAbout: string) => {
    if (editingTask) {
      editTask(editingTask.id, updatedTitle, updatedAbout);
      setEditingTask(null); 
    }
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowNav(!showNav)}>
              <Image source={require('../assets/toggle.png')} style={styles.toggleIcon} />
            </TouchableOpacity>
          </View>

          <NavBar visible={showNav} onClose={() => setShowNav(false)} />

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

                 
                  <TouchableOpacity
                    onPress={() => handleEdit({ id: task.id, title: task.title, about: task.about })}
                  >
                    <Image source={require('../assets/editIcon1.png')} style={styles.editIcon} />
                  </TouchableOpacity>

                 
                  <TouchableOpacity onPress={() => handleConfirmDelete(task.id)}>
                  <Image source={require('../assets/deleteIcon.png')} style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        
        <ConfirmDeletePopup
          visible={showConfirm} 
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />

        
        {editingTask && (
          <EditTaskPopup
            visible={true}
            initialTitle={editingTask.title}
            initialAbout={editingTask.about}
            onCancel={() => setEditingTask(null)}
            onSave={handleSaveEdit}
          />
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AddTaskScreen;
