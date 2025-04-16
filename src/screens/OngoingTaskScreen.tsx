import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/ongoingStyles';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup';
import EditTaskPopup from '../components/EditTaskPopup';
import { useTasks } from '../store/TaskContext';

interface Task {
  id: number;
  title: string;
  about: string;
  completed: boolean;
}

const OngoingTaskScreen = () => {
  const navigation = useNavigation();
  const { tasks, deleteTask, editTask, toggleTaskCompletion } = useTasks();

  const [ongoingTasks, setOngoingTasks] = useState<Task[]>([]);
  const [showNav, setShowNav] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAbout, setEditAbout] = useState('');

  // Refresh ongoing tasks whenever the screen is focused
  useEffect(() => {
    const updateOngoingTasks = () => {
      const ongoing = tasks.filter(task => !task.completed);
      setOngoingTasks(ongoing);
    };

    const unsubscribe = navigation.addListener('focus', updateOngoingTasks);
    return unsubscribe;
  }, [navigation, tasks]);

  const openEditPopup = (task: Task) => {
    setSelectedTaskId(task.id);
    setEditTitle(task.title);
    setEditAbout(task.about);
    setShowEdit(true);
  };

  const handleEditSave = () => {
    if (selectedTaskId !== null) {
      editTask(selectedTaskId, editTitle, editAbout);
      setShowEdit(false);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setSelectedTaskId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (selectedTaskId !== null) {
      deleteTask(selectedTaskId);
      setShowConfirm(false);
    }
  };

  const handleToggleCompletion = (taskId: number) => {
    // Toggle in context
    toggleTaskCompletion(taskId);
  
    // Immediately remove the completed task from the local ongoingTasks list
    setOngoingTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <View style={{ flex: 1 }}>
        {/* Header with nav toggle */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowNav(!showNav)}>
            <Text style={styles.toggleIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation bar */}
        <NavBar visible={showNav} onClose={() => setShowNav(false)} />

        {/* Task list */}
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
          {ongoingTasks.length === 0 ? (
            <Text style={styles.noTasksText}>No ongoing tasks</Text>
          ) : (
            ongoingTasks.map(task => (
              <View key={task.id} style={styles.taskBox}>
                {/* Checkbox */}
                <TouchableOpacity onPress={() => handleToggleCompletion(task.id)}>
                  <Text style={{ fontSize: 20 }}>
                    {task.completed ? '☑️' : '⬜'}
                  </Text>
                </TouchableOpacity>

                {/* Task Texts */}
                <View style={styles.taskTextBox}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskAbout}>{task.about}</Text>
                </View>

                {/* Edit & Delete */}
                <View style={styles.actionIcons}>
                  <TouchableOpacity onPress={() => openEditPopup(task)}>
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleConfirmDelete(task.id)}>
                    <Text style={styles.deleteIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Popups */}
        <ConfirmDeletePopup
          visible={showConfirm}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />

        <EditTaskPopup
          visible={showEdit}
          title={editTitle}
          about={editAbout}
          onChangeTitle={setEditTitle}
          onChangeAbout={setEditAbout}
          onSave={handleEditSave}
          onCancel={() => setShowEdit(false)}
        />
      </View>
    </ImageBackground>
  );
};

export default OngoingTaskScreen;
