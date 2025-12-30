import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'
import type { MeResponse } from '../api/types'

export type UserProfile = {
  id: string
  name: string
  avatar?: string
}

export type UserState = {
  profile: UserProfile | null
  roles: string[]
  permissionCodes: string[]
}

const initialState: UserState = {
  profile: null,
  roles: [],
  permissionCodes: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action: { payload: MeResponse }) => {
      state.profile = {
        id: action.payload.id,
        name: action.payload.name,
        avatar: action.payload.avatar,
      }
      state.roles = action.payload.roles
      state.permissionCodes = action.payload.permissionCodes
    })
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
