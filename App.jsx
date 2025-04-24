import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/stack-navigator/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import Signup from './src/stack-navigator/Signup';
import Login from './src/stack-navigator/Login';
import Context from './src/stack-navigator/Context';
import MainPage from './src/stack-navigator/MainPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const {Navigator, Screen} = createStackNavigator();

const App = () => {
  const [hasUser, setHasUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      setHasUser(user ? 'Main' : 'Home');
    };
    checkUser();
  }, []);

  if (hasUser === null)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );

  return (
    <Context>
      <NavigationContainer>
        <Navigator initialRouteName={hasUser}>
          <Screen name="Home" component={HomeScreen} />
          <Screen name="Signup" component={Signup} />
          <Screen name="Login" component={Login} />
          <Screen name="Main" component={MainPage} />
        </Navigator>
      </NavigationContainer>
    </Context>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
