import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import {styles} from './HomeScreen';
import {useContext, useState} from 'react';
import {ContextApi} from './Context';
import Axios from 'axios';

const Signup = ({navigation}) => {
  const {signupData, setSignupData, success, setSuccess} =
    useContext(ContextApi);
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(name, value) {
    setSignupData(prev => ({...prev, [name]: value}));
  }

  function isValid() {
    const newError = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    const name = signupData?.name?.trim() || '';
    const email = signupData?.email?.trim() || '';
    const password = signupData?.password?.trim() || '';
    const phone = signupData?.phone?.trim() || '';

    if (!name) {
      newError.name = 'Name is required';
    } else if (name.length < 3) {
      newError.name = 'Name should contain at least 3 characters';
    }

    if (!email) {
      newError.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newError.email = 'Invalid email format';
    }

    if (!password) {
      newError.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newError.password =
        'Password must have 1 uppercase, 1 lowercase, 1 number, 1 special character';
    }

    if (!phone) {
      newError.phone = 'Phone is required';
    } else if (!phoneRegex.test(phone)) {
      newError.phone = 'Phone must be 10 digits and start with 6-9';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  }

  async function handleSubmit() {
    if (!isValid()) return;

    setIsSubmitting(true);

    try {
      const emailCheck = signupData.email.trim();
      const phoneCheck = signupData.phone.trim();

      const emailRes = await Axios.get(
        `http://192.168.0.61:3000/signinDetails?email=${emailCheck}`,
      );
      if (emailRes.data.length > 0) {
        setError(prev => ({
          ...prev,
          email: 'User with this email already exists',
        }));
        setIsSubmitting(false);
        return;
      }

      const phoneRes = await Axios.get(
        `http://192.168.0.61:3000/signinDetails?phone=${phoneCheck}`,
      );
      if (phoneRes.data.length > 0) {
        setError(prev => ({
          ...prev,
          phone: 'User with this phone number already exists',
        }));
        setIsSubmitting(false);
        return;
      }

      const payload = {
        name: signupData.name.trim(),
        email: emailCheck,
        password: signupData.password.trim(),
        phone: phoneCheck,
      };

      await Axios.post('http://192.168.0.61:3000/signinDetails', payload);

      setSignupData({
        name: '',
        email: '',
        password: '',
        phone: '',
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      navigation.navigate('Login');
    } catch (err) {
      console.error('Signup failed:', err.message);
      alert('Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.fieldsBorder}
          placeholder="Enter the name"
          onChangeText={text => handleChange('name', text)}
          value={signupData.name}
        />
        {error.name && <Text style={styles.errorText}>{error.name}</Text>}

        <TextInput
          style={styles.fieldsBorder}
          keyboardType="email-address"
          placeholder="Enter the email"
          onChangeText={text => handleChange('email', text)}
          value={signupData.email}
        />
        {error.email && <Text style={styles.errorText}>{error.email}</Text>}

        <TextInput
          style={styles.fieldsBorder}
          secureTextEntry
          placeholder="Enter the password"
          onChangeText={text => handleChange('password', text)}
          value={signupData.password}
        />
        {error.password && (
          <Text style={styles.errorText}>{error.password}</Text>
        )}

        <TextInput
          style={styles.fieldsBorder}
          placeholder="Enter the phone"
          keyboardType="phone-pad"
          onChangeText={text => handleChange('phone', text)}
          value={signupData.phone}
        />
        {error.phone && <Text style={styles.errorText}>{error.phone}</Text>}

        <TouchableOpacity
          style={[
            styles.btn,
            {alignItems: 'center', opacity: isSubmitting ? 0.6 : 1},
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}>
          <Text style={styles.btnText}>
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
