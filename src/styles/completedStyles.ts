import { StyleSheet } from 'react-native';

const completedTaskStyles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleIcon: {
    fontSize: 30,
    color: '#fff',
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
  },
  taskBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.3,
    borderColor: '#A66CFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  taskTextBox: {
    flex: 1,
    marginHorizontal: 10,
  },
  taskTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskAbout: {
    color: '#fff',
    fontSize: 12,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  editIcon: {
    width:20,
    height:20,
  },
  completedIcon: {
    fontSize: 20,
    color: '#4CAF50', 
    marginRight: 10,
  },
  
});

export default completedTaskStyles;
