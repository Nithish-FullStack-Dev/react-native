import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  Switch,
} from 'react-native';
import FloatingLabelInput from './FloatingLabelInput';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {storeFormData} from './Store/FormSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const scoreTypes = ['Percentage', 'CGPA', 'Grade'];

const Education = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [college, setCollege] = useState('');
  const [endYear, setEndYear] = useState('');
  const [scoreType, setScoreType] = useState('Percentage');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scoreValue, setScoreValue] = useState('');
  const isConnected = useSelector(state => state.form.isConnected);
  const navigation = useNavigation();
  const [isField, setIsField] = useState(false);
  const formData = useSelector(state => state.form.formData);
  const dispatch = useDispatch();

  const theme = {
    bg: isDarkMode ? '#1c1c1c' : '#f9f9f9',
    card: isDarkMode ? '#2a2a2a' : '#fff',
    text: isDarkMode ? '#fff' : '#111',
    label: isDarkMode ? '#ccc' : '#555',
    border: isDarkMode ? '#555' : '#ddd',
    placeholder: isDarkMode ? '#888' : '#999',
  };
  const themeText = isDarkMode ? '#fff' : '#000';

  function handlePrevious() {
    navigation.goBack();
  }

  async function handleNext() {
    if (!college || !endYear || !scoreValue) {
      setIsField(true);
      setTimeout(() => {
        setIsField(false);
      }, 2000);
      console.log(formData);
      return;
    }
    console.log(formData);
    const payload = {...formData, college, endYear, scoreValue};
    dispatch(storeFormData(payload));
    const hasData = await AsyncStorage.getItem(payload.email);
    if (hasData) {
      await AsyncStorage.removeItem(payload.email);
    }
    await AsyncStorage.setItem(payload.email, JSON.stringify(payload));
    navigation.navigate('ProfileImage');
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <Text style={[styles.heading, {color: theme.text}]}>
        Education Details
      </Text>

      <View
        style={[
          styles.card,
          {backgroundColor: theme.card, borderColor: theme.border},
        ]}>
        {/* Dark Mode Toggle */}
        <View style={styles.toggleRow}>
          <Text style={{color: theme.label, fontSize: 16}}>
            {isDarkMode ? 'Dark' : 'Light'} Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(prev => !prev)}
          />
        </View>

        <FloatingLabelInput
          style={[styles.input, {borderColor: theme.border, color: theme.text}]}
          value={college}
          onChangeText={setCollege}
          placeholder="Enter your college name"
          placeholderTextColor={theme.placeholder}
          isDarkMode={isDarkMode}
          label="College Name"
        />

        <FloatingLabelInput
          style={[styles.input, {borderColor: theme.border, color: theme.text}]}
          value={endYear}
          onChangeText={setEndYear}
          placeholder="e.g. 2023"
          keyboardType="numeric"
          maxLength={4}
          label="End year"
          isDarkMode={isDarkMode}
          placeholderTextColor={theme.placeholder}
        />

        <Text style={[styles.label, {color: theme.label}]}>Score Type</Text>
        <Pressable
          style={[
            styles.dropdown,
            {
              borderColor: theme.border,
              backgroundColor: isDarkMode ? '#333' : '#f1f1f1',
            },
          ]}
          onPress={() => setDropdownOpen(prev => !prev)}>
          <Text style={{color: theme.text, fontSize: 16}}>{scoreType}</Text>
        </Pressable>

        {dropdownOpen && (
          <View
            style={[
              styles.dropdownList,
              {
                backgroundColor: isDarkMode ? '#333' : '#f8f8f8',
                borderColor: theme.border,
              },
            ]}>
            {scoreTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownItem}
                onPress={() => {
                  setScoreType(type);
                  setDropdownOpen(false);
                }}>
                <Text style={{color: theme.text, fontSize: 16}}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <FloatingLabelInput
          style={[styles.input, {borderColor: theme.border, color: theme.text}]}
          value={scoreValue}
          isDarkMode={isDarkMode}
          label={scoreType}
          onChangeText={setScoreValue}
          placeholder={`Enter your ${scoreType.toLowerCase()}`}
          keyboardType={scoreType === 'Grade' ? 'default' : 'numeric'}
          placeholderTextColor={theme.placeholder}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: 'transparent',
                borderColor: 'black',
                borderWidth: 2,
              },
            ]}
            onPress={handlePrevious}>
            <Text style={styles.buttonText}>previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Save & Next</Text>
          </TouchableOpacity>
        </View>
        {isField && (
          <Text style={{paddingTop: 10, color: 'red', textAlign: 'center'}}>
            * Please all the details
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

export default Education;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  dropdownList: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  statusBanner: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
