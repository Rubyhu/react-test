import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, Method } from 'axios'
import type { ApiError, LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse } from './types'
import { request } from '../../util/request'
import { authActions } from '../slices/authSlice'
import { userActions } from '../slices/userSlice'

type AxiosBaseQueryArgs = {
  url: string
  method?: Method
  data?: unknown
  params?: unknown
  headers?: AxiosRequestConfig['headers']
}

const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
  async (args, api) => {
    try {
      const result = await request.request({
        url: args.url,
        method: args.method ?? 'GET',
        data: args.data,
        params: args.params,
        headers: args.headers,
      })
      return { data: result.data }
    } catch (e) {
      const err = e as ApiError
      if (err.code === 'AUTH_TOKEN_EXPIRED' || err.code === 'AUTH_UNAUTHORIZED' || err.code === 'HTTP_401') {
        api.dispatch(authActions.logout())
        api.dispatch(userActions.reset())
      }
      return { error: err }
    }
  }

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', data: body }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({ url: '/auth/register', method: 'POST', data: body }),
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({ url: '/users/me', method: 'GET' }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery } = authApi
