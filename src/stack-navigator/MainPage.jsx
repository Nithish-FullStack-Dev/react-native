import {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ContextApi} from './Context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const {Screen, Navigator} = createBottomTabNavigator();

const HomePage = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const Setting = () => {
  const navigation = useNavigation();
  async function handleLogout() {
    const parsedData = await AsyncStorage.getItem('user');
    if (parsedData) {
      const user = JSON.parse(parsedData);
      await axios.delete(`http://192.168.0.61:3000/signinDetails/${user.id}`);
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Text style={styles.btnText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainPage = () => {
  const {success} = useContext(ContextApi);
  return (
    <>
      <View>
        {success && (
          <Text
            style={{
              color: 'green',
              textAlign: 'center',
              padding: 10,
              fontSize: 16,
            }}>
            ✅ Successfully Logged in
          </Text>
        )}
        <Text>Main Page</Text>
      </View>

      <Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'HomePage') {
              iconName = 'home';
            } else if (route.name === 'Setting') {
              iconName = 'settings';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Screen name="HomePage" component={HomePage} />
        <Screen name="Setting" component={Setting} />
      </Navigator>
    </>
  );
};

export default MainPage;
