import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { getAccessToken } from '../store/storage'
import type { ApiError } from '../store/api/types'

export type RequestOptions = {
  baseURL?: string
  timeoutMs?: number
  getToken?: () => string | null
  onUnauthorized?: () => void
}

function isApiError(data: unknown): data is ApiError {
  if (!data || typeof data !== 'object') return false
  const d = data as { code?: unknown; message?: unknown }
  return typeof d.code === 'string' && typeof d.message === 'string'
}

/**
 * 标准化错误处理函数，将各种类型的错误转换为统一的ApiError格式
 * @param error - 需要标准化的未知类型错误
 * @returns 返回标准化的ApiError对象
 */
function normalizeError(error: unknown): ApiError {
  // 首先检查是否是Axios错误
  if (axios.isAxiosError(error)) {
    // 将错误断言为AxiosError类型
    const e = error as AxiosError<unknown>
    // 检查响应数据是否已经是ApiError格式
    if (isApiError(e.response?.data)) return e.response!.data

    // 处理请求超时错误
    if (e.code === 'ECONNABORTED') {
      return { code: 'NETWORK_TIMEOUT', message: 'Request timeout' }
    }

    // 处理没有响应的网络错误
    if (!e.response) {
      return { code: 'NETWORK_ERROR', message: 'Network error' }
    }

    // 处理HTTP错误状态码
    return {
      code: `HTTP_${e.response.status}`,
      message: (e.response.statusText || 'Request failed').trim(),
    }
  }

  // 如果错误已经是ApiError格式，直接返回
  if (isApiError(error)) return error

  // 处理未知类型的错误
  return { code: 'UNKNOWN_ERROR', message: 'Unknown error' }
}

export function createRequest(options: RequestOptions = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL ?? (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api',
    timeout: options.timeoutMs ?? 15000,
  })

  instance.interceptors.request.use((config) => {
    const token = (options.getToken ?? getAccessToken)()
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const apiError = normalizeError(err)
      if (apiError.code === 'AUTH_TOKEN_EXPIRED' || apiError.code === 'AUTH_UNAUTHORIZED') {
        options.onUnauthorized?.()
      }
      return Promise.reject(apiError)
    },
  )

  return instance
}

export const request = createRequest()

export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const res = await request.get<T>(url, config)
  return res.data
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  const res = await request.post<T>(url, data, config)
  return res.data
}

