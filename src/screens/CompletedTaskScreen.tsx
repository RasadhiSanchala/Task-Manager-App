import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/completedStyles';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup';
import { useTasks } from '../store/TaskContext';

interface Task {
  id: number;
  title: string;
  about: string;
  completed: boolean;
}

const CompletedTaskScreen = () => {
  const navigation = useNavigation();
  const { tasks, deleteTask } = useTasks();

  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [showNav, setShowNav] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    const updateCompletedTasks = () => {
      const completed = tasks.filter(task => task.completed);
      setCompletedTasks(completed);
    };

    const unsubscribe = navigation.addListener('focus', updateCompletedTasks);
    return unsubscribe;
  }, [navigation, tasks]);

  const handleConfirmDelete = (id: number) => {
    setSelectedTaskId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (selectedTaskId !== null) {
      deleteTask(selectedTaskId);

      setCompletedTasks(prevTasks =>
        prevTasks.filter(task => task.id !== selectedTaskId)
      );

      setShowConfirm(false);
      setSelectedTaskId(null);
    }
  };

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
          {completedTasks.length === 0 ? (
            <Text style={styles.noTasksText}>No completed tasks</Text>
          ) : (
            completedTasks.map(task => (
              <View key={task.id} style={styles.taskBox}>
                <Text style={styles.completedIcon}>☑️</Text>

                <View style={styles.taskTextBox}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskAbout}>{task.about}</Text>
                </View>

                <TouchableOpacity onPress={() => handleConfirmDelete(task.id)}>
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        
        <ConfirmDeletePopup
          visible={showConfirm}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      </View>
    </ImageBackground>
  );
};

export default CompletedTaskScreen;
