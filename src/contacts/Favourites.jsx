import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {updatedFavoirites} from './contact-redux/ContactSlice';

const Favourites = () => {
  const contacts = useSelector(state => state.contact.contacts);
  const favouriteContacts = useSelector(
    state => state.contact.favouriteContacts,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const isFavourite = contacts.filter(item => item.favourites > 0);
    dispatch(updatedFavoirites(isFavourite));
  }, [contacts]);

  const renderFavouriteContact = ({item}) => {
    const handlePress = () => {
      // navigation.navigate('ContactDetails', {contact: item});
    };

    return (
      <TouchableOpacity style={styles.contactContainer} onPress={handlePress}>
        <Image
          source={require('../../assets/Default_pfp.webp')}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>
            {item.first_name} {item.last_name}
          </Text>
        </View>
        <Icon name="star" size={24} color="gold" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {favouriteContacts.length > 0 ? (
        <>
          <Text style={styles.heading}>Favourites</Text>
          <FlatList
            data={favouriteContacts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderFavouriteContact}
          />
        </>
      ) : (
        <Text style={styles.emptyText}>No Favourites yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  heading: {
    fontSize: 25,
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});

export default Favourites;
