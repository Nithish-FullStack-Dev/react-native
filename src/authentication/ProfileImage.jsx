import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {storeFormData} from './Store/FormSlice';
import {fetchAuth, insertValues} from './Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileImage = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const formData = useSelector(state => state.form.formData);
  const [isField, setIsField] = useState(false);
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.form.isConnected);

  const themeText = isDarkMode ? '#fff' : '#000';

  const theme = {
    bg: isDarkMode ? '#1c1c1c' : '#f9f9f9',
    text: isDarkMode ? '#fff' : '#111',
    card: isDarkMode ? '#2c2c2c' : '#fff',
    border: isDarkMode ? '#555' : '#ddd',
    buttonBg: isDarkMode ? '#444' : '#007bff',
    buttonText: '#fff',
    submitBg: isDarkMode ? '#666' : '#28a745',
  };

  const choosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.7,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri;
          setPhoto(uri);
        }
      },
    );
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  async function handleSubmit() {
    if (!photo) {
      setIsField(true);
      setTimeout(() => {
        setIsField(false);
      }, 2000);
      return;
    }
    const payload = {...formData, photo};
    dispatch(storeFormData(payload));
    let {college, email, endYear, firstName, gender, scoreValue, skills, age} =
      payload;
    const hasData = await AsyncStorage.getItem(payload.email);
    if (hasData) {
      await AsyncStorage.removeItem(payload.email);
    }
    await AsyncStorage.setItem(email, JSON.stringify(payload));
    if (isConnected) {
      await insertValues(
        firstName,
        age,
        college,
        email,
        endYear,
        scoreValue,
        skills,
        gender,
        photo,
      );
    }
    setMsg('successfully submitted');
    const data = await fetchAuth();
    console.log(data);
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View
        style={[
          styles.card,
          {backgroundColor: theme.card, borderColor: theme.border},
        ]}>
        <View style={styles.toggleRow}>
          <Text style={{color: theme.text, fontSize: 16}}>
            {isDarkMode ? 'Dark' : 'Light'} Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(prev => !prev)}
          />
        </View>

        <Text style={[styles.title, {color: theme.text}]}>
          Select Profile Image
        </Text>

        {photo && (
          <Image
            source={{uri: photo}}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.buttonBg}]}
          onPress={choosePhoto}>
          <Text style={[styles.buttonText, {color: theme.buttonText}]}>
            Choose from Gallery
          </Text>
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                borderColor: theme.text,
                borderWidth: 2,
                backgroundColor: 'transparent',
              },
            ]}
            onPress={handlePrevious}>
            <Text style={[styles.buttonText, {color: theme.text}]}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: theme.submitBg}]}
            onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
        {isField && (
          <Text style={{paddingTop: 10, color: 'red', textAlign: 'center'}}>
            * Please all the details
          </Text>
        )}
        {msg && (
          <Text style={{paddingTop: 10, color: 'green', textAlign: 'center'}}>
            * {msg}
          </Text>
        )}
      </View>
      <View style={styles.statusBanner}>
        <Text style={{color: themeText}}>
          {isConnected ? '🟢 You are Online' : '🔴 You are Offline'}
        </Text>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#888',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusBanner: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
});
