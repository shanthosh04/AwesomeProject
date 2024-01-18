import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f0ffff',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 30,
    borderWidth: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    flex: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  button: {
    marginLeft: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
  },
  totalCaloriesText: {
    marginBottom: 50,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 0,
    textAlign: 'center',
  }
});

export default styles;
