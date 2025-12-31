import { createSlice,createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit'
import {userApi } from '@/api/user.ts'
export type UserInfo = {
  id: string
  name: string
  avatar?: string
  roles: string[]
  permissionCodes: string[]
}

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
export const getUserInfoAsync = createAsyncThunk('userInfo', async (params:any) => {
  const response: any = await userApi.getUserInfo(params)
  return {
    id: response.id,
    name: response.name,
    avatar: response.avatar,
    roles: response.roles ?? [],
    permissionCodes: response.permissionCodes ?? [],
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset() {
      return initialState
    },
  },
  extraReducers: (builder) => {
     builder.addCase(getUserInfoAsync.fulfilled, (state, action: PayloadAction<UserInfo>) => {
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
