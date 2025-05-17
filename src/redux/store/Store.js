import {configureStore} from '@reduxjs/toolkit';
import reducer from '../slice/Slice';

export const store = configureStore({
  reducer: {product: reducer},
});
