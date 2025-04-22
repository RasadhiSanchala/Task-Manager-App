import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';
import styles from '../styles/navBar';

type NavBarProps = {
  visible: boolean;
  onClose: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ visible, onClose }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }}>
     
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.container}>
     
            <View style={styles.header}>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.navBar}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  onClose();
                  navigation.navigate('AddTask');
                }}
              >
                <Image source={require('../assets/newTask.png')} style={styles.icon} />
                <Text style={styles.navText}>New Task</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  onClose();
                  navigation.navigate('OngoingTask');
                }}
              >
                <Image source={require('../assets/ongoingTask.png')} style={styles.icon} />
                <Text style={styles.navText}>Ongoing Task</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navItem}
                onPress={() => {
                  onClose();
                  navigation.navigate('CompletedTask');
                }}
              >
                <Image source={require('../assets/completedTask.png')} style={styles.icon} />
                <Text style={styles.navText}>Completed Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NavBar;
