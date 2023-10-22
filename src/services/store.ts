import { configureStore } from '@reduxjs/toolkit';
import promoSlice from './slices/promoSlice';
import phoneSlice from './slices/phoneSlice';



export const store = configureStore({
  reducer: {
    promo: promoSlice,
    phone: phoneSlice,   
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch