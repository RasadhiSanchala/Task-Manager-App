import { StyleSheet } from 'react-native';

const addTaskStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 50,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    marginTop: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
  inputsColumn: {
    flex: 1,
  },
  input: {
    borderWidth: 1.3,
    borderColor: '#A66CFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 12,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  plusButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.3,
    borderColor: '#A66CFF',
    borderRadius: 12,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  plusText: {
    color: '#A66CFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
  },

  // NEW STYLES
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
  deleteIcon: {
    fontSize: 18,
    color: '#A66CFF',
  },
});

export default addTaskStyles;
