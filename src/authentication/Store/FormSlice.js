import {createSlice} from '@reduxjs/toolkit';

const slices = createSlice({
  name: 'form',
  initialState: {
    isConnected: true,
    formData: {},
  },
  reducers: {
    checkConnection: (state, action) => {
      state.isConnected = action.payload;
    },
    storeFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export default slices.reducer;
export const {checkConnection, storeFormData} = slices.actions;
