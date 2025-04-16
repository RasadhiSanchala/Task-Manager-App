// store/TaskContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: number;
  title: string;
  about: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: { title: string; about: string }) => void;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('tasks');
      const savedNextId = await AsyncStorage.getItem('nextId');
      if (saved) setTasks(JSON.parse(saved));
      if (savedNextId) setNextId(parseInt(savedNextId));
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    AsyncStorage.setItem('nextId', nextId.toString());
  }, [tasks, nextId]);

  const addTask = ({ title, about }: { title: string; about: string }) => {
    const newTask: Task = { id: nextId, title, about, completed: false };
    setTasks(prev => [...prev, newTask]);
    setNextId(prev => prev + 1);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
