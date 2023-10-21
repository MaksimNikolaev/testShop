import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IPromo {
  banerVisible: boolean
}

const initialState: IPromo = {
  banerVisible: false,
}

const promoSlice = createSlice({
  name: 'promo',
  initialState,
  reducers: {    
    setVisibleBaner: (state, action: PayloadAction<boolean>) => {
      state.banerVisible = action.payload
    },
  },
})

export const { setVisibleBaner } = promoSlice.actions

export default promoSlice.reducer
