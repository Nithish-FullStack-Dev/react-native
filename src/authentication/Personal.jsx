import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingLabelInput from './FloatingLabelInput';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {storeFormData} from './Store/FormSlice';
import {fetchAuthByEmail} from './Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Personal = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [gender, setGender] = useState('');
  const [skills, setSkills] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isField, setIsField] = useState(false);
  const [msg, setMsg] = useState(null);
  const Navigation = useNavigation();
  const isConnected = useSelector(state => state.form.isConnected);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setRefreshing(true);
    setFirstName('');
    setEmail('');
    setAge('');
    setGender('');
    setSkills([]);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleSkill = skill => {
    setSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill],
    );
  };

  async function handleNext() {
    if (!firstName || !email || !age || !gender || skills.length === 0) {
      setIsField(true);
      setTimeout(() => {
        setIsField(false);
      }, 2000);
      return;
    }
    const hasEmail = await fetchAuthByEmail(email);
    console.log(hasEmail);
    if (hasEmail.length !== 0) {
      setMsg('* User already exist');
      setIsField(true);
      setTimeout(() => {
        setIsField(false);
      }, 2000);
      return;
    }
    setIsField(false);
    let payload = {firstName, email, age, gender, skills};
    dispatch(storeFormData(payload));
    await AsyncStorage.setItem(email, JSON.stringify(payload));
    Navigation.navigate('Education');
  }

  const themeText = isDarkMode ? '#fff' : '#000';
  const themeBorder = isDarkMode ? '#888' : '#ccc';
  const themeBg = isDarkMode ? '#1e1e1e' : '#fff';

  return (
    <ScrollView
      style={{backgroundColor: themeBg}}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#3b82f6"
        />
      }>
      <View style={styles.toggleRow}>
        <Text style={{color: themeText}}>
          {isDarkMode ? 'Dark' : 'Light'} Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(prev => !prev)}
        />
      </View>

      <View
        style={[
          styles.formCard,
          {backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9'},
        ]}>
        <Text style={[styles.heading, {color: themeText}]}>Sign Up</Text>

        <FloatingLabelInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          isDarkMode={isDarkMode}
        />
        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          isDarkMode={isDarkMode}
        />
        <FloatingLabelInput
          label="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          isDarkMode={isDarkMode}
        />

        {/* Gender */}
        <Text style={[styles.label, {color: themeText}]}>Gender</Text>
        <View style={styles.row}>
          {['Male', 'Female', 'Other'].map(option => (
            <Pressable
              key={option}
              style={styles.radioItem}
              onPress={() => setGender(option)}>
              <View style={[styles.radioCircle, {borderColor: themeBorder}]}>
                {gender === option && <View style={styles.radioDot} />}
              </View>
              <Text style={{color: themeText}}>{option}</Text>
            </Pressable>
          ))}
        </View>

        {/* Skills */}
        <Text style={[styles.label, {color: themeText}]}>Skills</Text>
        <View style={styles.row}>
          {['HTML', 'CSS', 'JS', 'React', 'Native'].map(skill => (
            <Pressable
              key={skill}
              style={styles.checkboxItem}
              onPress={() => toggleSkill(skill)}>
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: skills.includes(skill)
                      ? '#3b82f6'
                      : 'transparent',
                    borderColor: themeBorder,
                  },
                ]}>
                {skills.includes(skill) && (
                  <Icon name="check" size={14} color="#fff" />
                )}
              </View>
              <Text style={{color: themeText}}>{skill}</Text>
            </Pressable>
          ))}
        </View>

        {/* Buttons */}
        <View>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Save & Next</Text>
          </TouchableOpacity>
        </View>
        {isField && (
          <Text style={{paddingTop: 10, color: 'red', textAlign: 'center'}}>
            {msg ? msg : '* Please all the details'}
          </Text>
        )}
      </View>

      {/* Status */}
      <View style={[styles.statusBanner]}>
        <Text style={{color: themeText}}>
          {isConnected ? '🟢 You are Online' : '🔴 You are Offline'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Personal;

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 15,
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  formCard: {
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    marginBottom: 24,
  },
  statusBanner: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 6,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonOutlined: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
