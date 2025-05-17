import {configureStore} from '@reduxjs/toolkit';
import reducer from './ContactSlice';

export const store = configureStore({
  reducer: {contact: reducer},
});
