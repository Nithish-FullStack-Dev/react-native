import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {createTable, fetchData, insertUser} from '../Database';
import {useNavigation} from '@react-navigation/native';

const Signin = () => {
  const [signin, setSignin] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    createTable();
  }, []);

  function handleChange(field, value) {
    setSignin(preVal => ({...preVal, [field]: value}));
  }

  function handleSubmit() {
    const {name, email, password, age} = signin;
    if (!name || !email || !password || !age) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    fetchData(email)
      .then(dbData => {
        if (dbData) {
          Alert.alert('found', 'Email already exist, Try again');
        } else {
          insertUser(name, email, password, age);
          Alert.alert('Success', 'User data saved');
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        Alert.alert('Error', 'There was a problem checking the email');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={signin.name}
          onChangeText={text => handleChange('name', text)}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={text => handleChange('email', text)}
          value={signin.email}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={text => handleChange('password', text)}
          value={signin.password}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          onChangeText={text => handleChange('age', text)}
          value={signin.age}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Signin;
