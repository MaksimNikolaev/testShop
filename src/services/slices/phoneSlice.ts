import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getValidatePhone } from '../actions/phone';

export interface IPhoneSlice {
  validatePhone: IValidPhone | null;
  validatePhoneSuccess: boolean;
  validatePhoneloading: boolean;
  validatePhoneError: unknown;
}

export interface IValidPhone {
  valid: boolean;
  number: string;
  local_format: string;
  international_format: string;
  country_prefix: string;
  country_code: string;
  country_name: string;
  location: string;
  carrier: string;
  line_type: string;
}

const initialState: IPhoneSlice = {
  validatePhone: null,
  validatePhoneSuccess: false,
  validatePhoneloading: false,
  validatePhoneError: null,
};

const phoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getValidatePhone.pending, state => {
        state.validatePhone = null;
        state.validatePhoneloading = true;
        state.validatePhoneError = null;
      })
      .addCase(getValidatePhone.fulfilled, (state, action:PayloadAction<IValidPhone>) => {
        state.validatePhone = action.payload;
        state.validatePhoneSuccess = true;
        state.validatePhoneloading = false;
      })
      .addCase(getValidatePhone.rejected, (state, action) => {
        state.validatePhoneloading = false;
        state.validatePhoneError = action.payload;
      });
  },
});

export const { resetState } = phoneSlice.actions;

export default phoneSlice.reducer;
