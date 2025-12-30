import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { clearAccessToken, getAccessToken, setAccessToken } from '../storage'

export type AuthState = {
  accessToken: string | null
}

const initialState: AuthState = {
  accessToken: getAccessToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken
      setAccessToken(action.payload.accessToken)
    },
    logout(state) {
      state.accessToken = null
      clearAccessToken()
    },
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
