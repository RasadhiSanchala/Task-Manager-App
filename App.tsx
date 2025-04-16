import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';  
import CompletedTaskScreen from './src/screens/CompletedTaskScreen';
import OngoingTaskScreen from './src/screens/OngoingTaskScreen';

import { TaskProvider } from './src/store/TaskContext';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
   
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: true }} />
          <Stack.Screen name="CompletedTask" component={CompletedTaskScreen} options={{ headerShown: true }} />
          <Stack.Screen name="OngoingTask" component={OngoingTaskScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
