import {NavigationContainer} from '@react-navigation/native';
import Education from './Education';
import ProfileImage from './ProfileImage';
import {createStackNavigator} from '@react-navigation/stack';
import Personal from './Personal';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {checkConnection} from './Store/FormSlice';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(checkConnection(state.isConnected));
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Personal" component={Personal} />
        <Stack.Screen name="Education" component={Education} />
        <Stack.Screen name="ProfileImage" component={ProfileImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
