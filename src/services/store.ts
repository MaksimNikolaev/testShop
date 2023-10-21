import { configureStore } from '@reduxjs/toolkit';
import promoSlice from './slices/promoSlice';



export const store = configureStore({
  reducer: {
    promo: promoSlice,    
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch