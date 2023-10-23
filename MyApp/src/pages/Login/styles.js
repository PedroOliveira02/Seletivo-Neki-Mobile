import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    maxWidth: 350,
    padding: 20,
    borderRadius: 5,
  },
  passwordToggle: {
    fontSize: 22,
    cursor: 'pointer',
    marginLeft: -38,
  },
  label: {
    fontSize: 30,
    fontWeight: '600',
    color: '#676767',
  },
  labelSignup: {
    fontSize: 16,
    color: '#676767',
  },
  labelMsg: (success) => ({
    fontSize: 14,
    color: success ? 'green' : 'red',
  }),
  strongText: {
    cursor: 'pointer',
  },
});

export default styles;
