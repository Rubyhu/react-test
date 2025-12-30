import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../ui/layout/AppLayout'
import { RequireAuth, RequireRoles } from './wrappers'
import { LoginPage } from '../ui/pages/LoginPage'
import { RegisterPage } from '../ui/pages/RegisterPage'
import { DashboardPage } from '../ui/pages/DashboardPage'
import { ProfilePage } from '../ui/pages/ProfilePage'
import { UsersPage } from '../ui/pages/system/UsersPage'
import { RolesPage } from '../ui/pages/system/RolesPage'
import { NotFoundPage } from '../ui/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/profile', element: <ProfilePage /> },
      {
        path: '/system/users',
        element: (
          <RequireRoles roles={['admin']}>
            <UsersPage />
          </RequireRoles>
        ),
      },
      {
        path: '/system/roles',
        element: (
          <RequireRoles roles={['admin']}>
            <RolesPage />
          </RequireRoles>
        ),
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
