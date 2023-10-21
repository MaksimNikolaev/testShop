import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IPromo {
  banerVisible: boolean;
  panelVisible: boolean;
}

const initialState: IPromo = {
  banerVisible: false,
  panelVisible: false,
};

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {
    setVisibleBaner: (state, action: PayloadAction<boolean>) => {
      state.banerVisible = action.payload;
    },
    setVisiblePanel: (state, action: PayloadAction<boolean>) => {
      state.panelVisible = action.payload;
    },
  },
});

export const { setVisibleBaner, setVisiblePanel } = promoSlice.actions;

export default promoSlice.reducer;
