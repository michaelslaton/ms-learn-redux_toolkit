import { ordered as cakeOrdered } from '../cake/cakeSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numOfIcecreams: 20
}

const icecreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: state => {
      state.numOfIcecreams--
    },
    restocked: (state, actions) => {
      state.numOfIcecreams += actions.payload
    },
  },
  // extraReducers: {
  //   ['cake/ordered']: (state, action) => {
  //     state.numOfIcecreams--
  //   }
  // }
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state, action) => {
      state.numOfIcecreams--
    })
  }
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;