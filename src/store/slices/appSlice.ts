import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AppState = {
  collapsed: boolean
}

const initialState: AppState = {
  collapsed: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed
    },
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
