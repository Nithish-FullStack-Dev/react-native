import {createSlice} from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    contactInfo: {},
    favouriteContacts: [],
  },
  reducers: {
    fetchContact: (state, action) => {
      state.contacts = action.payload;
    },
    updateContactInfo: (state, action) => {
      state.contactInfo = action.payload;
    },
    updatedFavoirites: (state, action) => {
      state.favouriteContacts = action.payload;
    },
    deleteContact: (state, action) => {
      state.contacts.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  fetchContact,
  updateContactInfo,
  updatedFavoirites,
  deleteContact,
} = contactSlice.actions;
export default contactSlice.reducer;
