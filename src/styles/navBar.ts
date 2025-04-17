import { StyleSheet } from 'react-native';

const navBarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -18,
    left: -20,
    width: '70%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 10, 
  },

  header: {
    backgroundColor: '#3B0A75', 
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: 'contain',
  },

  appName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  navBar: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },

  navText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
});

export default navBarStyles;