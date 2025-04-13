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
    marginTop: 50,
    marginBottom: 30,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    padding: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  plusButton: {
    backgroundColor: '#3B71F3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  plusText: {
    color: '#fff',
    fontSize: 20,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default addTaskStyles;
