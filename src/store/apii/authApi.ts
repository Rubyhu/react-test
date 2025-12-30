import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import request from '@/utils/request'
import type { ApiError } from './types'

type LoginRequest = { account: string; password: string }
type LoginResponse = { accessToken: string }

type RegisterRequest = { account: string; password: string }
type RegisterResponse = { success: boolean }

type LogoutResponse = { success: boolean }

type MeResponse = { id: string; name: string; avatar?: string; roles?: string[]; permissionCodes?: string[] }

type BaseQueryArgs = { url: string; method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: unknown }

const baseQuery: BaseQueryFn<BaseQueryArgs, unknown, ApiError> = async (args) => {
  const method = args.method ?? 'GET'
  try {
    const data =
      method === 'GET'
        ? await request.get(args.url)
        : method === 'POST'
          ? await request.post(args.url, args.body as object)
          : method === 'PUT'
            ? await request.put(args.url, args.body as object)
            : await request.delete(args.url)
    return { data }
  } catch (e) {
    if (typeof e === 'string') return { error: { code: 'UNKNOWN', message: e } }
    const anyErr = e as { code?: string; message?: string; response?: { status?: number; data?: { code?: string; message?: string } } }
    const code = anyErr.response?.data?.code ?? anyErr.code ?? 'UNKNOWN'
    const message = anyErr.response?.data?.message ?? anyErr.message ?? 'Error'
    const status = anyErr.response?.status
    return { error: { code, message, status } }
  }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({ url: '/users/me', method: 'GET' }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useMeQuery } = authApi
