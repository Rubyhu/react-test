import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { authActions } from '../store/slices/authSlice'
import { userActions } from '../store/slices/userSlice'
import { authApi, useMeQuery } from '../store/api/authApi'
import type { ApiError } from '../store/api/types'
import { ForbiddenPage } from '../ui/pages/ForbiddenPage'

export function RequireAuth({ children }: { children: ReactNode }) {
  const token = useAppSelector((s) => s.auth.accessToken)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { isLoading, isFetching, isError, error } = useMeQuery(undefined, { skip: !token })

  if (!token) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  if (isLoading || isFetching) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin />
      </div>
    )
  }

  if (isError) {
    const code = (error as ApiError | undefined)?.code
    if (code === 'AUTH_TOKEN_EXPIRED' || code === 'AUTH_UNAUTHORIZED') {
      dispatch(authActions.logout())
      dispatch(userActions.reset())
      dispatch(authApi.util.resetApiState())
      const redirect = encodeURIComponent(location.pathname + location.search)
      return <Navigate to={`/login?redirect=${redirect}`} replace />
    }
  }

  return children
}

export function RequireRoles({ roles, children }: { roles: string[]; children: ReactNode }) {
  const userRoles = useAppSelector((s) => s.user.roles)
  const ok = roles.some((r) => userRoles.includes(r))
  if (!ok) return <ForbiddenPage />
  return children
}
