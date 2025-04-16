import { StyleSheet } from 'react-native';

const editTaskStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    width: '90%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    borderColor: '#A66CFF',
    borderWidth: 1,
    zIndex: 999,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A66CFF',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    borderColor: '#A66CFF',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default editTaskStyles;
