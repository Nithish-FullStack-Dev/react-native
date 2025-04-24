import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  btns: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 700,
  },
  fieldsBorder: {
    borderColor: 'black',
    borderWidth: 3,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    paddingLeft: 10,
    paddingBottom: 5,
    color: 'red',
  },
});

export default HomeScreen;
