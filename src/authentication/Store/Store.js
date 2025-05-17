import {configureStore} from '@reduxjs/toolkit';
import formReducer from './FormSlice';

const Store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default Store;
