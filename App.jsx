//! TODO TASK STORED IN DATABASE
/* import React from 'react';
import TodoDB from './src/todo-task/TodoDB';

const App = () => {
  return <TodoDB />;
};

export default App;
 */
//! TAB and STACK navigation
/* import {useEffect, useState} from 'react';
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
 */

//! API STORE
/* import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/redux/store/Store';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Product from './src/redux/products/Product';
import Cart from './src/redux/products/Cart';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Product"
            component={Product}
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
 */

//! DATABASE

/* import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from './src/db-store/authentication/Signin';
import Login from './src/db-store/authentication/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign" component={Signin} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; */

//!CONTACT
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import Recent from './src/contacts/Recent';
// import Favourites from './src/contacts/Favourites';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Contact from './src/contacts/Contact';
// import SearchContact from './src/contacts/SearchContact';
// import SaveContactIcon from './src/contacts/SaveContactIcon';
// import {Provider} from 'react-redux';
// import {store} from './src/contacts/contact-redux/Store';
// import {View} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import ContactDetails from './src/contacts/ContactDetails';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const ContactStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Contact" component={Contact} />
//       <Stack.Screen name="ContactDetails" component={ContactDetails} />
//     </Stack.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <Provider store={store}>
//         {/* <SearchContact /> */}
//         <NavigationContainer>
//           <View style={{flex: 1}}>
//             <Tab.Navigator
//               initialRouteName="Recent"
//               screenOptions={({route}) => ({
//                 tabBarIcon: ({color, size}) => {
//                   let iconName;
//                   if (route.name === 'Favourites') {
//                     iconName = 'heart-outline';
//                   } else if (route.name === 'Recent') {
//                     iconName = 'time-outline';
//                   } else if (route.name === 'ContactStack') {
//                     iconName = 'person-outline';
//                   }
//                   return <Ionicons name={iconName} size={size} color={color} />;
//                 },
//                 tabBarActiveTintColor: 'tomato',
//                 tabBarInactiveTintColor: 'gray',
//                 headerShown: false,
//               })}>
//               <Tab.Screen name="Favourites" component={Favourites} />
//               <Tab.Screen name="Recent" component={Recent} />
//               <Tab.Screen name="ContactStack" component={ContactStack} />
//             </Tab.Navigator>
//           </View>
//         </NavigationContainer>
//         <SaveContactIcon />
//       </Provider>
//     </>
//   );
// };

// export default App;

//! SYNCHROUS DATA

import {useEffect} from 'react';
import {createTable} from './src/authentication/Database';
import {Provider} from 'react-redux';
import Store from './src/authentication/Store/Store';
import Main from './src/authentication/Main';

const App = () => {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  );
};

export default App;
