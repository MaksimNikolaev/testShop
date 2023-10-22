import { createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_KEY, API } from '../../utils/constants';

// Валидация телефона
export const getValidatePhone = createAsyncThunk(
  'phone/getValidatePhone',
  async (phone: string , { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API}?api_key=${ACCESS_KEY}&phone=7${phone}`,        
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
