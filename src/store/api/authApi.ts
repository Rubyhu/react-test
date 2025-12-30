import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiError, LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse } from './types'
import * as mockServer from './mockServer'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery<ApiError>(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async (arg) => {
        try {
          const data = await mockServer.login(arg)
          return { data }
        } catch (e) {
          return { error: e as ApiError }
        }
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      queryFn: async (arg) => {
        try {
          const data = await mockServer.register(arg)
          return { data }
        } catch (e) {
          return { error: e as ApiError }
        }
      },
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      queryFn: async () => {
        try {
          const data = await mockServer.logout()
          return { data }
        } catch (e) {
          return { error: e as ApiError }
        }
      },
    }),
    me: builder.query<MeResponse, void>({
      queryFn: async () => {
        try {
          const data = await mockServer.me()
          return { data }
        } catch (e) {
          return { error: e as ApiError }
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery } = authApi
