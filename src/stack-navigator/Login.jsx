import {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {styles} from './HomeScreen';
import {ContextApi} from './Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const Login = ({navigation}) => {
  const {success, setSuccess, loginData, setLoginData} = useContext(ContextApi);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(key, value) {
    setLoginData(prev => ({...prev, [key]: value}));
  }

  function isValid() {
    const newError = {};

    if (!loginData.email?.trim()) {
      newError.email = 'Email is required';
    }

    if (!loginData.password?.trim()) {
      newError.password = 'Password is required';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  }

  async function handleSubmit() {
    if (!isValid()) return;

    try {
      setLoading(true);
      const response = await Axios.get(
        'http://192.168.0.61:3000/signinDetails',
      );
      const data = response.data;

      const user = data.find(
        u =>
          u.email === loginData.email.trim() &&
          u.password === loginData.password.trim(),
      );

      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setLoginData({email: '', password: ''});
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        navigation.navigate('Main');
      } else {
        setError({invalid: 'Incorrect email or password'});
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {success && (
        <Text
          style={{
            color: 'green',
            textAlign: 'center',
            padding: 10,
            fontSize: 16,
          }}>
          ✅ Successfully signed up
        </Text>
      )}
      <View>
        {error.invalid && <Text style={styles.errorText}>{error.invalid}</Text>}
        <TextInput
          style={styles.fieldsBorder}
          keyboardType="email-address"
          placeholder="Enter your email"
          value={loginData.email}
          onChangeText={text => handleChange('email', text)}
        />
        {error.email && <Text style={styles.errorText}>{error.email}</Text>}
        <TextInput
          style={styles.fieldsBorder}
          secureTextEntry
          placeholder="Enter your password"
          value={loginData.password}
          onChangeText={text => handleChange('password', text)}
        />
        {error.password && (
          <Text style={styles.errorText}>{error.password}</Text>
        )}

        <TouchableOpacity
          style={[styles.btn, {alignItems: 'center'}]}
          onPress={handleSubmit}
          disabled={loading}>
          <Text style={styles.btnText}>
            {loading ? 'Logging in...' : 'Log in'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
