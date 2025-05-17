import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchContactFromDB} from './ContactData';
import {fetchContact} from './contact-redux/ContactSlice';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Contact = () => {
  const [state, setState] = useState(true);
  const contacts = useSelector(state => state.contact.contacts);
  const contactinfo = useSelector(state => state.contact.contactInfo);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getContactsFromDB = async () => {
      const updatedContacts = await fetchContactFromDB();
      dispatch(fetchContact(updatedContacts));
      setState(false);
    };
    getContactsFromDB();
  }, [contactinfo]);

  const renderContact = ({item}) => {
    const handleContactPress = () => {
      navigation.navigate('ContactDetails', {contact: item});
    };
    // const profileImage = item.profile_img
    //   ? require(`../../assets/${item.profile_img}`)
    //   : require('../../assets/Default_pfp.webp');
    return (
      <View style={styles.contactContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/nithish-profile.jpeg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity
          style={styles.contactInfo}
          onPress={handleContactPress}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>
              {item.first_name} {item.last_name}
            </Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Icon name="phone" size={24} color="green" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {state ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={contacts}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#f4f4f4',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileContainer: {
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 16,
    color: '#555',
  },
  callButton: {
    padding: 10,
    backgroundColor: '#e5f9e6',
    borderRadius: 25,
  },
});

export default Contact;
