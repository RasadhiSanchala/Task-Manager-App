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
  const [editingTask, setEditingTask] = useState<null | {
    id: number;
    title: string;
    about: string;
  }>(null);


  useEffect(() => {
    const updateOngoingTasks = () => {
      const ongoing = tasks.filter(task => !task.completed);
      setOngoingTasks(ongoing);
    };

    const unsubscribe = navigation.addListener('focus', updateOngoingTasks);
    return unsubscribe;
  }, [navigation, tasks]);


  const openEditPopup = (task: Task) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      about: task.about,
    });
  };

  const handleSaveEdit = (updatedTitle: string, updatedAbout: string) => {
    if (editingTask) {
      editTask(editingTask.id, updatedTitle, updatedAbout);


      setOngoingTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id
            ? { ...task, title: updatedTitle, about: updatedAbout }
            : task
        )
      );

      setEditingTask(null);
    }
  };


  const handleConfirmDelete = (id: number) => {
    setSelectedTaskId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (selectedTaskId !== null) {
      deleteTask(selectedTaskId);

      setOngoingTasks(prevTasks =>
        prevTasks.filter(task => task.id !== selectedTaskId)
      );

      setShowConfirm(false);
      setSelectedTaskId(null);
    }
  };


  const handleToggleCompletion = (taskId: number) => {

    toggleTaskCompletion(taskId);


    setOngoingTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
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
          {ongoingTasks.length === 0 ? (
            <Text style={styles.noTasksText}>No ongoing tasks</Text>
          ) : (
            ongoingTasks.map(task => (
              <View key={task.id} style={styles.taskBox}>

                <TouchableOpacity onPress={() => handleToggleCompletion(task.id)}>
                  <Text style={{ fontSize: 20 }}>
                    {task.completed ? '☑️' : '⬜'}
                  </Text>
                </TouchableOpacity>


                <View style={styles.taskTextBox}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskAbout}>{task.about}</Text>
                </View>


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


        <ConfirmDeletePopup
          visible={showConfirm}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
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
      </View>
    </ImageBackground>
  );
};

export default OngoingTaskScreen;
