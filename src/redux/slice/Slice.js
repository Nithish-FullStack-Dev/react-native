import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return await response.json();
});

const slice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    items: [],
    isError: false,
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(val => val.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      isLoading = false;
      isError = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      isError = true;
      isLoading = false;
    });
  },
});

export const {addToCart, removeFromCart} = slice.actions;
export default slice.reducer;
