import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { UserPhoneNumber } from '../../type/core/phoneNumber';
import { RootState } from '../store';

export interface CounterState {
  passedPhoneNumberList: UserPhoneNumber[];
}

const initialState: CounterState = {
  passedPhoneNumberList: [],
};

export const counterSlice = createSlice({
  name: 'appBaseStore',
  initialState,
  reducers: {
    addUserPhoneNumber: (state, action: PayloadAction<UserPhoneNumber>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.passedPhoneNumberList.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserPhoneNumber } = counterSlice.actions;
export const selectAppBaseData = (state: RootState) => state.appBase;

export default counterSlice.reducer;
