import type { ReactNode } from 'react'
import { getAccessToken } from '../store/storage'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { ForbiddenPage } from '../ui/pages/ForbiddenPage'

/**
 * RequireAuth 组件，用于保护需要认证才能访问的路由
 * 当用户未登录时，会重定向到登录页面，并在登录后返回原来尝试访问的页面
 * @param children - 需要认证后才能渲染的子组件
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  // 使用 useLocation 获取当前路由信息，用于重定向时记录原始路径
  // 获取用户访问令牌，判断用户是否已登录
  // 以下代码被注释，可能是使用了另一种方式获取token
//   const token = useAppSelector((s) => s.auth.accessToken)
  const location = useLocation()
 const userToken = getAccessToken()
  if (!userToken) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }
  return children
}

export function RequireRoles({ roles, children }: { roles: string[]; children: ReactNode }) {
  const userRoles = useSelector((s:RootState) => s.user.roles)
  const ok = roles.some((r) => userRoles.includes(r))
  if (!ok) return <ForbiddenPage />
  return children
}
