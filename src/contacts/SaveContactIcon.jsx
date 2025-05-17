import React, {useEffect, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {createTable, fetchContactFromDB, insertContact} from './ContactData';
import {useDispatch} from 'react-redux';
import {fetchContact} from './contact-redux/ContactSlice';

const SaveContactIcon = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [favourites, setFavourites] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    createTable();
  }, []);

  async function handleSubmit() {
    if (!firstName.trim() || !phone.trim()) {
      alert('Please fill in both the first name and phone number.');
      return;
    }

    try {
      await insertContact(firstName, lastName, profileImg, phone, favourites);
      console.log('contact saved');

      const updatedContacts = await fetchContactFromDB();
      dispatch(fetchContact(updatedContacts));
      console.log(updatedContacts);

      setFirstName('');
      setLastName('');
      setPhone('');
      setProfileImg('');
      setFavourites(false);
      setModalVisible(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.plusIcon}
        onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={28} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Profile Image URL"
              value={profileImg}
              onChangeText={setProfileImg}
              style={styles.input}
            />
            <View style={styles.checkboxContainer}>
              <Text>Mark as Favourite:</Text>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setFavourites(!favourites)}>
                <Text style={styles.checkboxText}>{favourites ? '✓' : ''}</Text>
              </TouchableOpacity>
            </View>

            <Button title="Save Contact" onPress={handleSubmit} />

            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  plusIcon: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
});

export default SaveContactIcon;
