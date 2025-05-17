import {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {deleteContact, updateContactInfo} from './contact-redux/ContactSlice';
import {
  deleteContactFromDB,
  fetchContactById,
  updateContact,
} from './ContactData';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

const ContactDetails = ({route}) => {
  const {contact} = route.params;
  const dispatch = useDispatch();
  const contactToDisplay = useSelector(state => state.contact.contactInfo);
  const [modalVisible, setModalVisible] = useState(false);
  const [editContact, setEditContact] = useState({
    first_name: contact.first_name,
    last_name: contact.last_name,
    phone: contact.phone,
    profileImage: contact.profile_img,
  });
  const [favourites, setFavourites] = useState(contact.favourites);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(updateContactInfo(contact));
  }, []);

  function handleChange(field, value) {
    setEditContact(preVal => ({...preVal, [field]: value}));
  }

  function handleEditContact() {
    setModalVisible(true);
  }

  async function handleSubmit(contact) {
    await updateContact(contact);
    const updatedContactData = await fetchContactById(contact.id);
    dispatch(updateContactInfo(updatedContactData[0]));
    console.log(updatedContactData[0]);
    setModalVisible(false);
  }

  async function handleDelete() {
    await deleteContactFromDB(contact.id);
    dispatch(deleteContact(contact.id));
    dispatch(updateContactInfo({}));
    navigation.navigate('Contact');
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/nithish-profile.jpeg')}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>

      {/* Contact Info */}
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactName}>
          {contactToDisplay.first_name} {contactToDisplay.last_name}
        </Text>
        <Text style={styles.contactPhone}>{contactToDisplay.phone}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="phone" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message-square" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleEditContact}>
          <Icon name="edit-2" size={24} color="orange" />
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
                value={editContact.first_name}
                onChangeText={text => handleChange('first_name', text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Last Name"
                value={editContact.last_name}
                onChangeText={text => handleChange('last_name', text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Phone"
                value={editContact.phone}
                onChangeText={text => handleChange('phone', text)}
                keyboardType="phone-pad"
                style={styles.input}
              />
              <TextInput
                placeholder="Profile Image URL"
                value={editContact.profileImage}
                onChangeText={text => handleChange('profile_img', text)}
                style={styles.input}
              />
              <View style={styles.checkboxContainer}>
                <Text>Mark as Favourite:</Text>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setFavourites(!favourites)}>
                  <Text style={styles.checkboxText}>
                    {favourites ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                title="Edit Contact"
                onPress={() =>
                  handleSubmit({
                    ...editContact,
                    favourites: favourites,
                    id: contact.id,
                  })
                }
              />

              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
      <Button
        title="Delete contact"
        onPress={() => setDeleteModalVisible(true)}
      />

      <Modal
        visible={deleteModalVisible}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.deleteModalContainer}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalText}>
              Are you sure you want to delete this contact?
            </Text>

            <View style={styles.deleteModalButtonsContainer}>
              <Button title="Yes, Delete" onPress={handleDelete} />
              <Button
                title="No, Close"
                color="red"
                onPress={() => setDeleteModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  contactInfoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 18,
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
    marginBottom: 20,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //!MODAL STYLES
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
  //!DELETE MODAL
  deleteModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  deleteModalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default ContactDetails;
